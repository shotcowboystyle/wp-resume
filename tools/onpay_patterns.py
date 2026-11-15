"""Writes theme/onpay-concept/patterns/*.php (the homepage sections for both
variants of the OnPay A/B test, plus the experiment brief) and the header and
footer template parts.

Run: python3 tools/onpay_patterns.py  (or pnpm onpay:patterns)

Every block is built by one helper below, so the serialized markup matches what
the editor saves (no "invalid block" warnings). Copy for variant A is taken from
onpay.com (Nov 2026); variant B reuses only claims onpay.com already makes.
"""

import json
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "theme" / "onpay-concept" / "patterns"
OP = "https://onpay.com"
IMG = OP + "/wp-content/themes/onpay-2024/images/"
UP = OP + "/wp-content/uploads/"
GET_STARTED = OP + "/get-started/"
CONTACT = OP + "/about-us/contact/"


# ---- block helpers -------------------------------------------------------

def attrs(d):
    d = {k: v for k, v in d.items() if v not in (None, "", {}, [])}
    return (" " + json.dumps(d, separators=(",", ":"))) if d else ""


def color_classes(fg=None, bg=None):
    c = []
    if fg:
        c.append(f"has-{fg}-color")
    if bg:
        c.append(f"has-{bg}-background-color")
    if fg:
        c.append("has-text-color")
    if bg:
        c.append("has-background")
    return c


def cls(*parts):
    return " ".join(p for p in parts if p)


def group(inner, className=None, tag="div", bg=None, fg=None, layout="constrained", name=None, anchor=None, align=None):
    a = {}
    if name:
        a["metadata"] = {"name": name}
    if tag != "div":
        a["tagName"] = tag
    a["anchor"] = anchor
    a["align"] = align
    a["className"] = className
    a["backgroundColor"] = bg
    a["textColor"] = fg
    a["layout"] = {"type": layout} if layout else None
    classes = cls("wp-block-group", f"align{align}" if align else None, className, *color_classes(fg, bg))
    idattr = f' id="{anchor}"' if anchor else ""
    return f'<!-- wp:group{attrs(a)} -->\n<{tag} class="{classes}"{idattr}>{"".join(inner)}</{tag}>\n<!-- /wp:group -->\n'


def heading(text, level=2, className=None, fontSize=None, fg=None, align=None):
    a = {"textAlign": align}
    if level != 2:
        a["level"] = level
    a["className"] = className
    a["textColor"] = fg
    a["fontSize"] = fontSize
    classes = cls("wp-block-heading", f"has-text-align-{align}" if align else None, className, *color_classes(fg), f"has-{fontSize}-font-size" if fontSize else None)
    return f'<!-- wp:heading{attrs(a)} -->\n<h{level} class="{classes}">{text}</h{level}>\n<!-- /wp:heading -->\n'


def para(text, className=None, fontSize=None, fg=None, align=None):
    a = {"align": align, "className": className, "textColor": fg, "fontSize": fontSize}
    classes = cls(f"has-text-align-{align}" if align else None, className, *color_classes(fg), f"has-{fontSize}-font-size" if fontSize else None)
    c = f' class="{classes}"' if classes else ""
    return f"<!-- wp:paragraph{attrs(a)} -->\n<p{c}>{text}</p>\n<!-- /wp:paragraph -->\n"


def button(text, href, style=None):
    a = {"className": f"is-style-{style}" if style else None}
    return f'<!-- wp:button{attrs(a)} -->\n<div class="{cls("wp-block-button", a["className"])}"><a class="wp-block-button__link wp-element-button" href="{href}">{text}</a></div>\n<!-- /wp:button -->\n'


def buttons(*items, className=None, center=False):
    a = {"className": className, "layout": {"type": "flex", "justifyContent": "center"} if center else None}
    return f'<!-- wp:buttons{attrs(a)} -->\n<div class="{cls("wp-block-buttons", className)}">{"".join(items)}</div>\n<!-- /wp:buttons -->\n'


def image(src, alt, className=None):
    a = {"className": className}
    return f'<!-- wp:image{attrs(a)} -->\n<figure class="{cls("wp-block-image", className)}"><img src="{src}" alt="{alt}"/></figure>\n<!-- /wp:image -->\n'


def items_list(items, className=None):
    a = {"className": className}
    lis = "".join(f"<!-- wp:list-item -->\n<li>{t}</li>\n<!-- /wp:list-item -->\n" for t in items)
    return f'<!-- wp:list{attrs(a)} -->\n<ul class="{cls("wp-block-list", className)}">{lis}</ul>\n<!-- /wp:list -->\n'


def columns(*cols, className=None):
    a = {"className": className}
    inner = "".join(f'<!-- wp:column -->\n<div class="wp-block-column">{"".join(c)}</div>\n<!-- /wp:column -->\n' for c in cols)
    return f'<!-- wp:columns{attrs(a)} -->\n<div class="{cls("wp-block-columns", className)}">{inner}</div>\n<!-- /wp:columns -->\n'


def quote(text, cite, className=None):
    a = {"className": className}
    return f'<!-- wp:quote{attrs(a)} -->\n<blockquote class="{cls("wp-block-quote", className)}">{para(text)}<cite>{cite}</cite></blockquote>\n<!-- /wp:quote -->\n'


def details(summary, inner, className=None):
    a = {"className": className}
    return f'<!-- wp:details{attrs(a)} -->\n<details class="{cls("wp-block-details", className)}"><summary>{summary}</summary>{"".join(inner)}</details>\n<!-- /wp:details -->\n'


def stage(scene, label, priority=False):
    return f'<!-- wp:cb/stage{attrs({"scene": scene, "label": label, "priority": priority or None})} /-->\n'


def pattern(slug, title, category, body, description=""):
    head = f"<?php\n/**\n * Title: {title}\n * Slug: onpay-concept/{slug}\n * Categories: {category}\n"
    if description:
        head += f" * Description: {description}\n"
    head += " */\n?>\n"
    (OUT / f"{slug}.php").write_text(head + body)


def eyebrow(text, fg=None):
    # OnPay sets these as H4 above an H2, which skips heading levels (audit
    # finding 2); here they are styled paragraphs.
    return para(text, className="op-eyebrow", fg=fg)


# ---- variant A: today's onpay.com, rebuilt ---------------------------------
# Section by section from onpay.com's rendered DOM and computed CSS (Nov 2026).

ARROW = '<span class="op-arrow" aria-hidden="true"></span>'


def link(text, href, cls_="op-link"):
    return para(f'<a class="{cls_}" href="{href}">{text}</a>', className="op-link-row")


def tag(text, tone="dark-blue"):
    return f'<span class="op-tag op-tag--{tone}">{text}</span>'


def control():
    pattern("promo-banner", "Promo banner", "onpay", group([
        group([
            group([
                heading("Your best payroll decision for 2027 starts here.", className="op-promo__title", fg="ink"),
                para("New to payroll or switching? We handle setup.", className="op-promo__sub", fg="ink"),
            ], layout=None),
            buttons(button("See how it works" + ARROW, OP + "/year-end/", "pill")),
        ], className="op-promo__inner", layout=None),
    ], className="op-promo", tag="section", bg="green", layout=None))

    pattern("hero-control", "Hero: dashboard image (control)", "onpay", group([
        group([
            para('<a class="op-home-link op-home-link--green" href="' + OP + '/payroll/software/">Payroll</a>'
                 '<a class="op-home-link op-home-link--orange" href="' + OP + '/hr/software/">HR</a>'
                 '<a class="op-home-link op-home-link--purple" href="' + OP + '/benefits/small-business/">Benefits</a>'
                 '<a class="op-home-link op-home-link--light-blue" href="' + OP + '/time-tracking/software/">Time</a>', className="op-home-links"),
            heading("<strong>Powerful people tech,</strong> backed by real experts", 1, className="op-hero__title", fg="white"),
            para("OnPay pairs intuitive software with 35+ years of payroll expertise so you can run payroll in minutes, stay compliant, and get expert human help when you need it.", className="op-hero__sub", fg="white"),
            buttons(button("Get started", GET_STARTED), button("Look inside OnPay" + ARROW, OP + "/payroll/software/", "on-blue"), center=True),
        ], className="op-hero", layout=None),
        group([
            image(IMG + "OnPay_Main_Dashboard_Mock_2026_Hi_Res_min.png", "OnPay dashboard: a payroll run ready to start, the pay schedule, live support and an approved time-off request", "op-hero__img is-lcp"),
        ], className="op-hero-shot", layout=None),
    ], className="op-hero-wrap", tag="section", bg="brand-blue", fg="white", layout=None))

    awards = [
        ("Best Value,<br>2026", "PCMag", "PCMag Best Value", UP + "2026/07/pcmag-social-logo-white.png"),
        ("Best for Small<br>Businesses, 2026", "Business.com", "Business.com Best for Small Businesses", IMG + "Businessdotcom-logo_white.svg"),
        ("Best for Comprehensive<br>Features, 2026", "CNBC", "CNBC", IMG + "CNBC-logo_white.svg"),
        ("Best for Combined HR,<br>Benefits &amp; Payroll, 2026", "USA Today", "USA Today", UP + "2026/07/usa-today-seeklogo-white.png"),
        ("#1 in the Summer<br>Payroll Index, 2026", "G2", "G2", IMG + "G2Logo-White.png"),
    ]
    cards = "".join(group([
        image(src, alt, "op-award__logo"),
        heading(text, 3, className="op-award__title", fg="white"),
        para(tag(who), className="op-award__tag"),
    ], className="op-card op-card--glass op-award", layout=None) for text, who, alt, src in awards)
    pattern("awards", "Awards", "onpay", group([
        heading("Top-rated service you can <strong>trust</strong>", className="op-center-text", fg="white"),
        group([cards], className="op-row op-row--5", layout=None),
        link("See all ratings &amp; reviews", OP + "/payroll/best-payroll-ratings-reviews/"),
    ], className="op-sec op-sec--blue op-awards", tag="section", bg="brand-blue", fg="white", layout=None))

    products = [
        ("Payroll", "Full-service payroll packed with value", "Run payroll confidently with software that is built for efficiency, priced with clarity, and backed by an accuracy guarantee. The calculations, filings, and tax payments are all automated. All the essentials are included — like multi-state payroll, local taxes, integrating with accounting software, and year-end filings.", "/payroll/software/", "34t305av9n", "ff2407de73c1406736ca2a8c4321df37"),
        ("HR", "Maximize organization and efficiency with HR", "Simplify hiring, onboarding, and personnel management without adding more work. From customizable onboarding workflows and eSignature templates to PTO management and task delegation, OnPay HR helps you automate repeatable processes and stay more organized.", "/hr/software/", "cdtopl4j2o", "2fa111498886a81e63ac6d9eb34e96cc"),
        ("Benefits", "Offer the benefits your team wants most", "Offer competitive medical, dental, and vision coverage without the hassle. Connect with our licensed in-house agents to select top plans from major carriers, invite employees to enroll online, and let our team handle ongoing plan administration at no extra cost.", "/benefits/small-business/", "chtmztd992", "9a017069b2c531f1260ff9e2c6fdaa2a"),
        ("Time", "Effortlessly track hours, overtime, and more", "Ditch manual timesheets and duplicate spreadsheet work. Let employees clock in from their mobile devices with location-based geofencing, automatically calculate regular and overtime hours, and approve timesheets that import straight into your next pay run.", "/time-tracking/software/", "rrsvw045x2", "515d961da555f7125f1a9a14b879b52d"),
    ]
    tab_labels = "".join(heading(name, 3, className="op-tab-label") for name, *_ in products)
    panels = "".join(group([
        group([
            para('<span class="op-progress" aria-hidden="true"></span>', className="op-progress-row"),
            heading(h3, 3, className="op-tab__title", fg="white"),
            para(body, className="op-tab__body", fg="white"),
            buttons(button("Get started", GET_STARTED), button("Learn more" + ARROW, OP + path, "on-blue")),
        ], className="op-tab__copy", layout=None),
        group([
            para(f'<a class="op-video" href="https://fast.wistia.net/embed/iframe/{vid}?autoPlay=true"><img src="https://embed-ssl.wistia.com/deliveries/{thumb}.jpg?image_crop_resized=960x540" width="960" height="540" alt="Play the OnPay {name} video" loading="lazy"><span class="op-video__play" aria-hidden="true"></span></a>', className="op-tab__media"),
        ], className="op-tab__shot", layout=None),
    ], className=f"op-tabpanel op-tabpanel--{name.lower()}", layout=None) for name, h3, body, path, vid, thumb in products)
    pattern("products", "Products (tabs)", "onpay", group([
        para("Products", className="op-eyebrow op-center-text", fg="green-on-blue"),
        heading('Tools to <span class="op-semibold">take your business further</span>', className="op-center-text", fg="white"),
        group([
            group([tab_labels], className="op-tablist", layout=None),
            group([panels], className="op-tabpanels", layout=None),
        ], className="op-tabs", layout=None),
    ], className="op-sec op-sec--blue op-angled", tag="section", bg="brand-blue", fg="white", anchor="products", layout=None))

    pattern("expert-support", "Expert support", "onpay", group([
        group([
            group([image(UP + "2024/05/Green-background-photo-only-support-horizontal.png", "An OnPay support specialist wearing a headset, working at a laptop", "op-support__img")], className="op-col", layout=None),
            group([
                para("Expert support", className="op-eyebrow", fg="brand-blue"),
                heading('Intuitive software.<br><strong>Human support.</strong>'),
                para("OnPay is consistently top-rated for better support for businesses of all sizes. That’s backed by decades of real human experts in this space."),
                items_list([
                    "100% US-based team trained in-house on payroll and compliance",
                    "Free prior-wage and employee data migration when you switch",
                    "Reach real people for support by phone, chat, and email",
                    "No support paywalls — all OnPay clients have access to the same responsive support, whether you have one employee or 100+",
                ], "is-style-checks"),
            ], className="op-col", layout=None),
        ], className="op-split", layout=None),
    ], className="op-sec op-sec--white op-support", tag="section", bg="white", layout=None))

    features = [
        ("Payroll", "Hire and pay W-2 and 1099 workers accurately", "/payroll/software/", "2024/03/OnPay_Icons_Pay_Roll_Shadow_Color.svg"),
        ("HR", "Streamline your team, documents, and tasks", "/hr/software/", "2024/03/OnPay_Icons_Employees_Shadow_Color.svg"),
        ("Time Tracking", "Track hours, overtime, breaks, and PTO", "/time-tracking/software/", "2024/03/OnPay_Icons_Clock_In_Shadow_Color.svg"),
        ("Benefits", "Offer competitive benefits at an affordable price", "/benefits/small-business/", "2024/04/OnPay_Icons_Healthcare_Shadow_Color.svg"),
        ("Compliance", "Stay on top of shifting legal requirements", "/app-directory/category/benefits-and-compliance/compliance-resources-payroll/", "2024/03/OnPay_Icons_Checklist_Shadow_Color.svg"),
        ("Live HR Support", "Handle complex HR questions with expert guidance", "/app-directory/category/benefits-and-compliance/live-hr-support-payroll/", "2024/03/OnPay_Icons_Customer_Service_Shadow_Color.svg"),
    ]
    fcards = "".join(group([
        image(UP + icon, "", "op-feature__icon"),
        heading(f'<a href="{OP + path}">{name}</a>', 3, className="op-feature__title"),
        para(line, className="op-feature__text"),
    ], className="op-card op-card--small op-feature", layout=None) for name, line, path, icon in features)
    pattern("features", "Features grid", "onpay", group([
        para("Flexible features", className="op-eyebrow op-center-text", fg="brand-blue"),
        heading("<strong>Simple to start,</strong> plus power to scale", className="op-center-text"),
        para("From payroll-first-timers to growing teams, OnPay fits your needs at any stage. Build the plan your business needs today with the runway to grow for tomorrow.", className="op-lede op-center-text"),
        group([fcards], className="op-row op-row--6", layout=None),
        link("See all features", OP + "/payroll/software/features/"),
    ], className="op-sec op-sec--grey", tag="section", bg="grey", layout=None))

    pattern("testimonial", "Testimonial", "onpay", group([
        group([
            para("Client reviews", className="op-pill"),
            heading('The decision business owners <strong>never</strong> second-guess', className="op-testimonial__title", fg="white"),
            para("“Choosing OnPay to manage my payroll has been <strong>one of my best business decisions.</strong> I know that the proper taxes are being taken out on time and that my employees have the ability to access their account easily.”", className="op-testimonial__quote", fg="white"),
            para("— Sheila, Wizard of Paws Pet Salon, <strong>OnPay client since 2017</strong>", className="op-testimonial__who", fg="peach"),
        ], className="op-testimonial", layout=None),
        link("See client case studies", OP + "/client-stories/"),
    ], className="op-sec op-sec--blue op-dots", tag="section", bg="brand-blue", fg="white", layout=None))

    logos = [("MainStreet", "MainStreet-logo.png"), ("Xero", "Xero-logo.png"), ("QuickBooks Online", "QuickBooks-Online-logo.png"), ("JazzHR", "JazzHR-logo.png"), ("Vestwell", "Vestwell_logo.png"), ("When I Work", "When-I-Work-logo.png"), ("Deputy", "Deputy-logo.png"), ("ERGO NEXT", "ERGO_NEXT_vertical_red_sRGB.png"), ("Middesk", "Middesk-logo.png"), ("TurboTax", "TurboTax-logo.png")]

    def loop(row, reverse=False):
        # The row runs twice so the loop is seamless; the copy is hidden from assistive tech.
        tiles = "".join(f'<span class="op-int-card"><img src="{IMG + f}" alt="{name}" width="100" height="100" loading="lazy"></span>' for name, f in row)
        copy = "".join(f'<span class="op-int-card" aria-hidden="true"><img src="{IMG + f}" alt="" width="100" height="100" loading="lazy"></span>' for name, f in row)
        return para(f'<span class="op-loop{" op-loop--reverse" if reverse else ""}">{tiles}{copy}</span>', className="op-loop-row")

    pattern("integrations", "Integrations", "onpay", group([
        para("Integrations and partnerships", className="op-eyebrow op-center-text", fg="brand-blue"),
        heading('Connect your back office<br><span class="op-semibold">(and your accountant’s)</span>', className="op-center-text"),
        para("From highly customizable accounting and 401(k) integrations to advanced HR and compliance tools, our partnerships and integrations make life easier for you and the financial advisors you work with.", className="op-lede op-lede--wide op-center-text"),
        group([loop(logos[:5]), loop(logos[5:], True)], className="op-loops", layout=None),
        buttons(button("Explore all" + ARROW, OP + "/app-directory/", "secondary"), center=True),
    ], className="op-sec op-sec--grey", tag="section", bg="grey", layout=None))

    pattern("pricing", "Pricing", "onpay", group([
        group([
            para("Transparent pricing", className="op-eyebrow op-center-text", fg="peach"),
            heading('Clear pricing. Zero haggling.<br><span class="op-semibold">Total flexibility.</span>', className="op-center-text", fg="white"),
            para("Get complete payroll, automated tax filings, and free expert setup without sitting through a sales pitch. Keep your base plan lean, or tailor your plan as you grow by adding integrated time tracking, HR compliance tools, or health benefits.", className="op-lede op-lede--wide op-center-text", fg="white"),
            group([
                heading("Starting at", className="op-price__label"),
                group([
                    group([para('<span class="op-price__num">$49</span><span class="op-price__per">/month</span>', className="op-price__amount"), para(tag("Base Fee"), className="op-price__tag")], className="op-price__col", layout=None),
                    para('<span class="op-price__plus" aria-hidden="true">+</span>', className="op-price__col op-price__col--plus"),
                    group([para('<span class="op-price__num">$6</span><span class="op-price__per">/month</span>', className="op-price__amount"), para(tag("Per Worker", "orange"), className="op-price__tag")], className="op-price__col", layout=None),
                ], className="op-price__row", layout=None),
            ], className="op-card op-price", layout=None),
        ], className="op-sec op-sec--blue op-pricing-top", bg="brand-blue", fg="white", layout=None),
        group([link("See what’s included", OP + "/payroll/software/costs-pricing/")], className="op-sec op-sec--white op-pricing-bottom", bg="white", layout=None),
    ], className="op-pricing", tag="section", layout=None))

    pattern("final-cta", "Final call to action", "onpay", group([
        para("Let’s do this", className="op-eyebrow op-center-text", fg="brand-blue"),
        heading("<strong>It’s easy</strong><br>to get started", className="op-center-text"),
        para("Try OnPay out yourself to see how easy payroll and HR can be. To get started, just share a few basic details about your business. Our team of pros will set everything up and import your employees’ information for you.", className="op-lede op-lede--narrow op-center-text"),
        buttons(button("Get started", GET_STARTED), button("Look inside OnPay" + ARROW, OP + "/payroll/software/", "secondary"), center=True),
    ], className="op-sec op-sec--white op-final", tag="section", bg="white", layout=None))

    res = [("Payroll", "Payroll 101", "Get expert advice on how to get payroll calculations and taxes right.", "/insights/topic/payroll/"),
           ("HR", "HR Basics", "From hiring best practices to ways to stay organized as you grow, we’ve got the inside scoop.", "/insights/topic/hr/"),
           ("Benefits", "Benefits Guide", "Learn how businesses of every size can offer the perks that employees want most.", "/insights/topic/benefits/")]
    rcards = "".join(group([
        para(tag(t, "orange"), className="op-resource__tag"),
        heading(f'<a href="{OP + path}">{name}</a>', 3, className="op-resource__title", fg="white"),
        para(text, className="op-resource__text", fg="white"),
        para('Explore <span class="op-arrow op-arrow--right" aria-hidden="true"></span>', className="op-resource__more", fg="white"),
    ], className="op-card op-card--glass op-resource", layout=None) for t, name, text, path in res)
    pattern("resources", "Resources", "onpay", group([
        heading("Small business resources", className="op-center-text", fg="white"),
        para("Get expert insights on how to run and grow an effective small business.", className="op-center-text", fg="white"),
        group([rcards], className="op-row op-row--3", layout=None),
    ], className="op-sec op-sec--blue op-dots op-dots--bottom", tag="section", bg="brand-blue", fg="white", layout=None))


# ---- shared chrome: header and footer (template parts) ----------------------

def nav_link(label, url):
    return f'<!-- wp:navigation-link {json.dumps({"label": label, "url": url, "kind": "custom"}, separators=(",", ":"))} /-->\n'


def submenu(label, url, items):
    inner = "".join(nav_link(l, OP + u if u.startswith("/") else u) for l, u in items)
    return f'<!-- wp:navigation-submenu {json.dumps({"label": label, "url": url, "kind": "custom"}, separators=(",", ":"))} -->\n{inner}<!-- /wp:navigation-submenu -->\n'


def chrome():
    parts = OUT.parent / "parts"
    nav = (
        '<!-- wp:navigation {"overlayBackgroundColor":"white","overlayTextColor":"ink","className":"op-nav","layout":{"type":"flex","justifyContent":"left"}} -->\n'
        + submenu("Products", OP + "/payroll/software/", [("Payroll", "/payroll/software/"), ("HR", "/hr/software/"), ("Benefits", "/benefits/small-business/"), ("Time tracking", "/time-tracking/software/"), ("Features", "/payroll/software/features/"), ("Integrations", "/app-directory/")])
        + submenu("Solutions", OP + "/payroll/software/industries/", [("By industry", "/payroll/software/industries/"), ("For new businesses", "/payroll/software/payroll-for-new-businesses/"), ("For small businesses", "/payroll/software/payroll-for-small-businesses/"), ("For mid-sized businesses", "/payroll/software/industries/medium-size-businesses/"), ("W-2 workers", "/payroll/software/w-2-workers/"), ("Contractors", "/payroll/software/1099-workers/"), ("Remote teams", "/payroll/software/remote-workers/")])
        + nav_link("Pricing", OP + "/payroll/software/costs-pricing/")
        + submenu("Resources", OP + "/insights/", [("Payroll 101", "/insights/topic/payroll/"), ("HR basics", "/insights/topic/hr/"), ("Benefits guide", "/insights/topic/benefits/"), ("Payroll calculators", "/payroll/calculator-tax-rates/"), ("State compliance guides", "/business-guides/compliance/")])
        + submenu("For Accountants", OP + "/payroll/software/accountants/", [("Become a Partner", "/payroll/software/accountants/"), ("The Ledger: Accounting Resources", "/ledger/")])
        + nav_link("For Employees", "https://help.onpay.com/hc/en-us/articles/4406432366363-Requesting-access-to-your-Employee-Portal")
        + "<!-- /wp:navigation -->\n"
    )
    logo = '<!-- wp:image {"width":"150px","height":"31px","sizeSlug":"full","linkDestination":"custom","className":"op-logo"} -->\n<figure class="wp-block-image size-full is-resized op-logo"><a href="/"><img src="' + IMG + 'OnPay_Wordmark_White.svg" alt="OnPay home" style="width:150px;height:31px"/></a></figure>\n<!-- /wp:image -->\n'
    header = group([
        group([
            group([logo, nav], className="op-header__left", layout=None),
            buttons(button("Login", "https://app.onpay.com/app/login", "outline-white"), button("Get started", GET_STARTED), className="op-header__actions"),
        ], className="op-header__bar", layout=None),
    ], className="op-header", bg="brand-blue", fg="white", layout=None)
    (parts / "header.html").write_text(header)

    def col(*sections):
        out = []
        for title, links in sections:
            out.append(heading(title, className="op-footer__title", fg="white"))
            out.append(items_list([f'<a href="{u if u.startswith("http") else OP + u}">{t}</a>' for t, u in links], "op-footer__links"))
        return out

    menu = columns(
        col(("Getting started", [("Get one month free", "/get-started/"), ("Switching providers", "/payroll/software/switch-payroll-companies/")]),
            ("Pricing", [("Pricing starts at $55 per month", "/payroll/software/costs-pricing/")]),
            ("Solutions", [("By industry", "/payroll/software/industries/"), ("For new businesses", "/payroll/software/payroll-for-new-businesses/"), ("For small businesses", "/payroll/software/payroll-for-small-businesses/"), ("For mid-sized businesses", "/payroll/software/industries/medium-size-businesses/"), ("W-2 workers", "/payroll/software/w-2-workers/"), ("Contractors", "/payroll/software/1099-workers/"), ("Remote teams", "/payroll/software/remote-workers/")])),
        col(("Products", [("Payroll", "/payroll/software/"), ("HR", "/hr/software/"), ("Benefits", "/benefits/small-business/"), ("Time Tracking", "/time-tracking/software/")]),
            ("Features", [("Direct deposit payroll", "/payroll/software/direct-deposit-service/"), ("Hiring and onboarding", "/hr/software/employee-onboarding/"), ("PTO management", "/hr/software/pto-tracking/"), ("Health insurance", "/benefits/small-business/health-insurance/"), ("Workers’ comp", "/benefits/small-business/workers-comp/"), ("401(k) retirement", "/benefits/small-business/401k/"), ("Employee self-service", "/payroll/software/employee-self-service/"), ("Custom reporting", "/payroll/software/payroll-reports/"), ("Org charts", "/hr/software/org-charts/"), ("Integrations", "/app-directory/"), ("Explore all features", "/payroll/software/features/")])),
        col(("Why OnPay", [("Ratings and reviews", "/payroll/best-payroll-ratings-reviews/"), ("Case studies", "/client-stories/"), ("Compare providers", "/payroll/best-payroll-services/")]),
            ("Resources", [("Payroll 101", "/insights/topic/payroll/"), ("HR basics", "/insights/topic/hr/"), ("Benefits guide", "/insights/topic/benefits/"), ("Payroll Calculators", "/payroll/calculator-tax-rates/"), ("State compliance guides", "/business-guides/compliance/"), ("Security", "/security/")]),
            ("Accountants", [("Become a Partner", "/payroll/software/accountants/"), ("The Ledger: Accounting Resources", "/ledger/")])),
        col(("About us", [("In the news", "/about-us/news-press/"), ("About us", "/about-us/"), ("Careers", "https://careers.onpay.com")]),
            ("Support", [("Help Center", "https://help.onpay.com/hc/en-us"), ("Contact us", "/about-us/contact/")])),
        className="op-footer__menu",
    )
    social = (
        '<!-- wp:social-links {"iconColor":"white","iconColorValue":"#ffffff","className":"is-style-logos-only op-footer__social","layout":{"type":"flex","justifyContent":"center"}} -->\n'
        '<ul class="wp-block-social-links has-icon-color is-style-logos-only op-footer__social">'
        + "".join(f'<!-- wp:social-link {json.dumps({"url": u, "service": s, "label": "OnPay on " + n}, separators=(",", ":"))} /-->' for u, s, n in [("https://www.facebook.com/OnPayInc", "facebook", "Facebook"), ("https://www.youtube.com/@OnPayPayroll", "youtube", "YouTube"), ("https://www.linkedin.com/company/onpay", "linkedin", "LinkedIn"), ("https://x.com/OnPay", "x", "X"), ("https://www.instagram.com/onpayinc/", "instagram", "Instagram")])
        + "</ul>\n<!-- /wp:social-links -->\n"
    )
    flogo = '<!-- wp:image {"width":"150px","height":"31px","sizeSlug":"full","linkDestination":"custom","align":"center","className":"op-footer__logo"} -->\n<figure class="wp-block-image aligncenter size-full is-resized op-footer__logo"><a href="/"><img src="' + IMG + 'OnPay_Wordmark_White.svg" alt="OnPay home" style="width:150px;height:31px"/></a></figure>\n<!-- /wp:image -->\n'
    footer = group([
        menu,
        flogo,
        para("Serving Clients for Over 30 Years", className="op-footer__copy", align="center"),
        social,
        para("Insurance offered through OnPay Insurance Agency, LLC (CA License #0L29422)", className="op-footer__copy", align="center"),
        para('<a href="' + OP + '/terms-and-conditions/">Terms and Conditions</a> | <a href="' + OP + '/privacy/">Privacy</a> | <a href="#cookie-settings">Manage Cookies</a> | <a href="' + OP + '/sitemap/">Sitemap</a>', className="op-footer__copy", align="center"),
        para("©2026 OnPay, LLC", className="op-footer__copy", align="center"),
        para('Concept rebuild by Curtis Blanton for a job application, not affiliated with or endorsed by OnPay. Logos and photos load from onpay.com and belong to their owners; people in the product scenes are fictional. <a href="/experiment-brief/">Read the experiment brief</a>.', className="op-footer__copy op-disclaimer", align="center"),
    ], className="op-footer", bg="footer-blue", fg="white", layout=None)
    (parts / "footer.html").write_text(footer)


# ---- variant B: fewer words, bigger type, people first ---------------------

def step(*inner, className=None):
    return group(list(inner), className=cls("op-step", className), layout=None)


def sticky(panel, steps, className=None, bg=None, fg=None, name=None):
    return group([
        group([panel], className="op-stack__panel", layout=None),
        group(steps, className="op-stack__steps", layout=None),
    ], className=cls("is-style-sticky-stack", className), tag="section", bg=bg, fg=fg, layout=None, name=name)


def variant_b():
    pattern("b-hero", "Experts hero (sticky)", "onpay-b", sticky(
        stage("onpay-expert", "A US-based OnPay payroll specialist answers a new employer’s question about Ohio taxes in chat, then both registrations are checked off.", True),
        [
            step(
                para("Payroll, HR and benefits", className="op-kicker", fg="mint"),
                heading("Payroll backed by <span class=\"op-mark\">real people.</span>", 1, className="is-style-display", fg="white"),
                para("Run payroll in minutes. When a question comes up, a US-based payroll expert answers by phone, chat or email.", className="op-lede"),
                buttons(button("Get started", GET_STARTED, "xl"), button("Talk to an expert", CONTACT, "outline-white")),
                para("Free expert setup <span aria-hidden=\"true\">·</span> $0 to switch <span aria-hidden=\"true\">·</span> US-based support", className="op-b-assure"),
                className="op-step--intro",
            ),
            step(heading("Ask a person.", className="is-style-display", fg="white"), para("Not a bot, not a help-center maze. Real people, by phone, chat and email.", className="op-lede")),
            step(heading("Get the answer.", className="is-style-display", fg="white"), para("Specialists trained in-house on payroll and compliance, in every plan.", className="op-lede")),
        ], className="op-b op-b-hero", bg="brand-blue", fg="white", name="Experts hero",
    ))

    awards = "".join(group([image(src, alt, "op-award__logo"), para(alt, className="op-b-award__name")], className="op-b-award", layout=None) for alt, src in [("PCMag Best Value 2026", UP + "2026/07/pcmag-social-logo-white.png"), ("CNBC Best for Comprehensive Features 2026", IMG + "CNBC-logo_white.svg"), ("G2 #1 Summer Payroll Index 2026", IMG + "G2Logo-White.png")])
    pattern("b-proof", "Proof in big numbers (sticky)", "onpay-b", sticky(
        group([
            heading("Why owners <strong>stay</strong>", fg="white", className="op-b-proof__title"),
            group([awards], className="op-b-awards", layout=None),
        ], layout=None),
        [
            step(para("35+", className="op-giant"), para("years of payroll expertise behind the software.", className="op-lede")),
            step(para("100%", className="op-giant"), para("US-based support team, trained in-house.", className="op-lede")),
            step(para("$0", className="op-giant"), para("to switch. Setup and prior-wage migration are free.", className="op-lede")),
        ], className="op-b op-b-proof op-stack--panel-left", bg="navy", fg="white", name="Proof",
    ))

    pattern("b-how", "How it works (sticky)", "onpay-b", sticky(
        stage("onpay-dashboard", "The OnPay dashboard: payroll for Jan 21 to Feb 3 is started and submitted, the pay dates move forward, a time-off request is approved and live support is offered."),
        [
            step(para("1", className="op-step__num"), heading("Tell us about your business.", className="op-b-how__h"), para("A few basic details. That’s it.", className="op-lede")),
            step(para("2", className="op-step__num"), heading("We set everything up.", className="op-b-how__h"), para("Our team of pros imports your employees’ information for you.", className="op-lede")),
            step(para("3", className="op-step__num"), heading("Run payroll in minutes.", className="op-b-how__h"), para("Taxes calculated, filed and paid. A person is a call away.", className="op-lede")),
        ], className="op-b op-b-how", bg="white", name="How it works",
    ))

    pattern("b-pricing", "Pricing in one number", "onpay-b", group([
        para("Clear pricing. Zero haggling.", className="op-kicker", fg="green-ink"),
        para('<span class="op-dollar">$</span>49', className="op-mega"),
        para('<strong>a month</strong>, plus <strong>$6 per worker</strong>. Free expert setup, no sales pitch.', className="op-lede"),
        buttons(button("Get started", GET_STARTED, "xl")),
        link("See what’s included", OP + "/payroll/software/costs-pricing/"),
    ], className="is-style-screen op-b op-b-pricing", tag="section", bg="ice"))

    pattern("b-testimonial", "Pull quote", "onpay-b", group([
        quote("“One of my best business decisions.”", "<strong>Sheila</strong> <span>Wizard of Paws Pet Salon, OnPay client since 2017</span>", "op-pull"),
    ], className="is-style-screen op-b op-b-quote", tag="section", bg="brand-blue", fg="white"))

    pattern("b-cta", "Talk to a person (final CTA)", "onpay-b", group([
        heading("Talk to a person <span class=\"op-mark\">today.</span>", className="is-style-display"),
        para("Start in minutes, or call first. Either way, you get a real expert.", className="op-lede"),
        buttons(button("Get started", GET_STARTED, "xl"), button("Talk to an expert", CONTACT, "secondary")),
    ], className="is-style-screen op-b op-b-cta", tag="section", bg="white"))


# ---- the brief -------------------------------------------------------------

def brief():
    def table(rows):
        head = "".join(f"<th>{h}</th>" for h in rows[0])
        body = "".join("<tr>" + "".join(f"<td>{c}</td>" for c in r) + "</tr>" for r in rows[1:])
        return f'<!-- wp:table -->\n<figure class="wp-block-table"><table><thead><tr>{head}</tr></thead><tbody>{body}</tbody></table></figure>\n<!-- /wp:table -->\n'

    body = "".join([
        para("A homepage A/B test for onpay.com, built as a reusable WordPress block theme. Both variants also fix the three findings from my November 2026 audit of the live site. Open each one directly:"),
        buttons(button("See variant A (control)", "/?cb_variant=a"), button("See variant B (experts)", "/?cb_variant=b", "secondary")),
        heading("Hypothesis"),
        para("Today’s homepage has 12 sections. Owners comparing payroll providers are increasingly offered AI-first tools with no people behind them. <strong>If the homepage leads with OnPay’s human experts, says it in fewer words and keeps the page substantial with oversized type and long, pinned scroll sections, then more visitors will click Get started</strong>, because the value is understood faster and the difference from AI-only competitors is clear."),
        heading("Variants"),
        table([
            ["", "A: control", "B: experts"],
            ["Sections", "12 (today’s page)", "6, each a full screen or longer"],
            ["Lead message", "Powerful people tech, backed by real experts", "Payroll backed by real people"],
            ["Product imagery", "Static dashboard PNG (as today)", "Animated stageshow scenes: an expert chat and the dashboard"],
            ["Layout", "Standard sections", "Display type, pinned panels, scroll-driven reveals (CSS only)"],
        ]),
        heading("Measurement"),
        items_list([
            "<strong>Primary:</strong> Get started click-through per session (<code>cta_click</code> with <code>experiment_variant</code>, then the /get-started/ form start in GA4 and HubSpot).",
            "<strong>Guardrails:</strong> bounce rate, 75% scroll depth, Talk to an expert clicks (support load), LCP/INP/CLS per variant.",
            "<strong>Assignment:</strong> server-side, 50/50, sticky for 30 days by first-party cookie, no flicker. <code>experiment_impression</code> fires once per view. QA links force a variant without storing it.",
            "<strong>Sample size:</strong> needs OnPay’s real baseline. At an assumed 4% click-through, detecting a 10% relative lift (to 4.4%) at 95% confidence and 80% power needs about 39,500 sessions per variant; run at least two full weeks so weekday patterns even out.",
            "<strong>Caching:</strong> assignment responses are sent <code>Cache-Control: private</code> with <code>Vary: Cookie</code>. On NitroPack and Cloudflare, cache per variant cookie or assign at the edge.",
        ]),
        heading("Audit findings fixed in this theme"),
        table([
            ["Finding (Nov 2026 audit)", "Fix here"],
            ["Tags fired after cookies were declined; no Consent Mode signal; GPC ignored", "Consent Mode v2 defaults to denied before any tag, so no banner has to interrupt the first visit; Manage Cookies (footer) opens the choices, built with the Interactivity API; the stored choice is re-applied on every page; GPC keeps ad consent denied"],
            ["Zoom blocked (<code>user-scalable=no</code>)", "WordPress’s default viewport: pinch zoom works"],
            ["Unnamed menu toggle and social links", "Core Navigation and Social Links blocks, which name both"],
            ["Missing <code>&lt;main&gt;</code>, skipped heading levels, missing alt text", "Templates wrap content in <code>&lt;main&gt;</code>; patterns keep heading order; every informative image has alt text"],
            ["Color contrast failures", "Buttons use #0a7f5c (5.0:1) instead of #11a77a (3.1:1); eyebrows on blue use mint (7.7:1). The tokens are in theme.json"],
            ["Layout shift on home (CLS 0.27)", "Fixed-size frames for every image and scene; the cookie choices open as an overlay; Poppins is preloaded and self-hosted"],
            ["reCAPTCHA on every page (about 1.5 MB)", "None on this page; on the real site, load it when a form field first gets focus"],
        ]),
        heading("How it’s built"),
        items_list([
            "<strong>Design system:</strong> theme.json holds the palette, Poppins, fluid type scale, spacing, shadows and radii; block styles (sticky stack, card, display heading, button styles) carry the rest.",
            "<strong>Reusable:</strong> every section is a pattern in two categories (control and experts), so any page can be assembled from them in the editor.",
            "<strong>Experiment block:</strong> <code>cb/experiment</code> wraps the two variants on the front-page template.",
            "<strong>Product scenes:</strong> <code>cb/stage</code> server-renders a sized poster, then loads a 44 KB (gzip) Preact build of the stageshow scenes when the scene nears the viewport. Under reduced motion the poster stays.",
        ]),
    ])
    pattern("experiment-brief", "Experiment brief", "onpay", body, "Hypothesis, metrics and audit fixes for the homepage test.")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    control()
    chrome()
    variant_b()
    brief()
    print("wrote", len(list(OUT.glob("*.php"))), "patterns to", OUT)
