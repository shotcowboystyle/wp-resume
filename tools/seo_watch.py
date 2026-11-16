#!/usr/bin/env python3
"""Sitemap-wide SEO regression checks over every URL in the sitemap.

Fetches every URL in the sitemap index and flags:
  error: non-200 status, empty page (no <title>), noindex on a sitemap URL,
         AggregateRating values that never appear in the visible text
  warn:  missing/foreign canonical, Organization node without @id, duplicate titles

Usage: seo_watch.py https://onpay.com [report.md]   (exit 1 when any error)
Stdlib only, so it runs on a bare GitHub runner.
"""
import collections
import concurrent.futures as cf
import html
import json
import re
import sys
import time
import urllib.error
import urllib.request

UA = "Mozilla/5.0 (compatible; seo-watch/1.0; +https://github.com/)"
SKIP_EXT = (".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".pdf")


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None  # report redirects as their own status


OPENER = urllib.request.build_opener(NoRedirect)


def fetch(url, tries=4):
    for attempt in range(tries):
        try:
            r = OPENER.open(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=40)
            return r.status, r.read().decode("utf-8", "replace")
        except urllib.error.HTTPError as e:
            if e.code == 429 and attempt < tries - 1:
                time.sleep(5 * (attempt + 1))  # host rate limit, back off and retry
                continue
            return e.code, ""
        except OSError as e:
            if attempt < tries - 1:
                time.sleep(3)
                continue
            return f"ERR {e}", ""


def sitemap_urls(base):
    status, idx = fetch(base.rstrip("/") + "/sitemap_index.xml")
    if status != 200:
        status, idx = fetch(base.rstrip("/") + "/sitemap.xml")
    if status != 200:
        sys.exit(f"no sitemap found at {base} ({status})")
    children = re.findall(r"<sitemap>\s*<loc>(.*?)</loc>", idx, re.S) or [None]
    urls = {}
    for child in children:
        body = idx if child is None else fetch(html.unescape(child))[1]
        for loc in re.findall(r"<url>\s*<loc>(.*?)</loc>", body, re.S):
            loc = html.unescape(loc.strip())
            if not loc.lower().endswith(SKIP_EXT):
                urls.setdefault(loc, (child or "sitemap.xml").rsplit("/", 1)[-1])
    return urls


def visible_text(body):
    body = re.sub(r"<(script|style|noscript)[^>]*>.*?</\1>", " ", body, flags=re.S | re.I)
    return " ".join(html.unescape(re.sub(r"<[^>]+>", " ", body)).split())


def ld_nodes(body):
    out = []
    for block in re.findall(r'<script[^>]*application/ld\+json[^>]*>(.*?)</script>', body, re.S | re.I):
        try:
            data = json.loads(block)
        except ValueError:
            out.append({"@type": "__PARSE_ERROR__"})
            continue
        stack = [data]
        while stack:
            x = stack.pop()
            if isinstance(x, dict):
                out.append(x)
                stack.extend(x.values())
            elif isinstance(x, list):
                stack.extend(x)
    return out


def types(node):
    t = node.get("@type", [])
    return t if isinstance(t, list) else [t]


def check(url):
    status, body = fetch(url)
    issues = []
    if status != 200:
        return url, None, [("error", f"status {status}")]
    head = body.split("</head>", 1)[0]
    title = re.search(r"<title[^>]*>(.*?)</title>", head, re.S | re.I)
    title = html.unescape(title.group(1)).strip() if title else ""
    if not title:
        issues.append(("error", "empty page or missing <title> (soft 404?)"))
    robots = " ".join(re.findall(r'<meta[^>]*name=["\']robots["\'][^>]*content=["\']([^"\']+)', head, re.I))
    if "noindex" in robots.lower():
        issues.append(("error", "noindex on a sitemap URL"))
    canon = re.findall(r'<link[^>]*rel=["\']canonical["\'][^>]*href=["\']([^"\']+)', head, re.I)
    if not canon:
        issues.append(("warn", "no canonical"))
    elif html.unescape(canon[0]) != url:
        issues.append(("warn", f"canonical points to {canon[0]}"))
    nodes = ld_nodes(body)
    if any("__PARSE_ERROR__" in types(n) for n in nodes):
        issues.append(("error", "JSON-LD parse error"))
    if any("Organization" in types(n) and "@id" not in n and len(n) > 3 for n in nodes):
        issues.append(("warn", "Organization node without @id (split entity)"))
    text = visible_text(body)
    for n in nodes:
        if "AggregateRating" in types(n):
            vals = [str(n.get(k)) for k in ("ratingValue", "ratingCount", "reviewCount") if n.get(k)]
            hidden = [v for v in vals if v not in text]
            if hidden:
                issues.append(("error", f"AggregateRating {'/'.join(vals)} not visible on page"))
    return url, title, issues


def main():
    base = sys.argv[1] if len(sys.argv) > 1 else "https://onpay.com"
    out = sys.argv[2] if len(sys.argv) > 2 else None
    urls = sitemap_urls(base)
    # ponytail: 2 workers stays under the host's rate limit; raise if the sitemap grows past a few thousand URLs
    with cf.ThreadPoolExecutor(2) as ex:
        results = list(ex.map(check, sorted(urls)))

    titles = collections.defaultdict(list)
    for url, title, _ in results:
        if title:
            titles[title].append(url)
    rows = [(sev, url, urls[url], msg) for url, _, iss in results for sev, msg in iss]
    for title, us in titles.items():
        if len(us) > 1:
            rows += [("warn", u, urls[u], f"duplicate title shared by {len(us)} pages") for u in us]

    errors = [r for r in rows if r[0] == "error"]
    warns = [r for r in rows if r[0] == "warn"]
    lines = [f"## Sitemap checks: {base}", "",
             f"{len(urls)} sitemap URLs checked. **{len(errors)} errors**, {len(warns)} warnings.", ""]
    for label, group in (("Errors", errors), ("Warnings", warns)):
        if group:
            lines += [f"### {label}", "", "| URL | Sitemap | Issue |", "|---|---|---|"]
            lines += [f"| {u} | {s} | {m} |" for _, u, s, m in sorted(group, key=lambda r: (r[3], r[1]))[:300]]
            if len(group) > 300:
                lines.append(f"| ... | | {len(group) - 300} more |")
            lines.append("")
    report = "\n".join(lines)
    if out:
        open(out, "w").write(report)
    print(report)
    sys.exit(1 if errors else 0)


if __name__ == "__main__":
    main()
