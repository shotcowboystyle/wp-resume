# wp-resume

Curtis Blanton's job application, built in WordPress. Each link opens a live site in your browser, nothing to install.

- **[Resume](https://playground.wordpress.net/?mode=seamless&blueprint-url=https://raw.githubusercontent.com/shotcowboystyle/wp-resume/main/blueprint.json)**
- **[OnPay homepage A/B test](https://playground.wordpress.net/?mode=seamless&blueprint-url=https://raw.githubusercontent.com/shotcowboystyle/wp-resume/main/blueprint-onpay.json)**: loads Variant A or B at random
  - [Experiment A (control)](https://playground.wordpress.net/?mode=seamless&blueprint-url=https://raw.githubusercontent.com/shotcowboystyle/wp-resume/main/blueprint-onpay.json&url=%2F%3Fcb_variant%3Da)
  - [Experiment B (experts)](https://playground.wordpress.net/?mode=seamless&blueprint-url=https://raw.githubusercontent.com/shotcowboystyle/wp-resume/main/blueprint-onpay.json&url=%2F%3Fcb_variant%3Db)

---

## About this repository

<details>
<summary>Contents</summary>

- [What's inside](#whats-inside)
  - [Blocks](#blocks)
  - [Measurement](#measurement)
  - [SEO and schema](#seo-and-schema)
  - [Plugins in the blueprint](#plugins-in-the-blueprint)
- [OnPay homepage A/B test (second blueprint)](#onpay-homepage-ab-test-second-blueprint)
- [Develop](#develop)

</details>

A block theme plus a plugin of custom Gutenberg blocks, shipped as [WordPress Playground](https://wordpress.org/playground/)
blueprints. The links above boot the whole site, logged in, with the editor a click away.

## What's inside

| Path | What it is |
| --- | --- |
| `theme/cb-resume` | Block theme. `theme.json` tokens (palette, Montserrat + Open Sans self-hosted variable fonts, fluid type), full-screen slides as `core/group` block styles, scroll-snap and IntersectionObserver fade-up reveals with per-letter headings (off under `prefers-reduced-motion`), keyboard section jumps (arrows, Page Up/Down, Space, Home/End). No jQuery, no page builder. |
| `plugin/cb-resume-blocks` | Custom blocks, each with `block.json` and a PHP `render.php`. |
| `blueprint.json` | Installs the plugins below, the theme and blocks from this repo, then seeds the resume page. |
| `dev/blueprint.dev.json` | Same, but for local dev with the folders mounted. |

### Blocks

- **Timeline / Timeline entry**: dated entries with InnerBlocks for details. Used for experience and work.
- **Skill**: years of hands-on use as a bar or ring. Checkable years, not self-rated percentages.
- **Metric**: a result with its source and as-of date.
- **Employer payroll cost calculator**: 2026 Social Security (to the $184,500 wage base), Medicare,
  FUTA and SUTA. Interactivity API front end, server-rendered first paint from a PHP twin of the math.
- **A/B experiment**: server-side 50/50 split, sticky by cookie, no flicker. `?cb_variant=a|b` forces a
  variant for QA. Assignment responses are sent `Cache-Control: private` and `Vary: Cookie`.
- **Product scene (stageshow)**: a sized poster rendered on the server, then an animated
  [stageshow](https://github.com/benjitaylor/skills) scene loaded only near the viewport (44 KB gzip,
  Preact). Never loaded under reduced motion.

### Measurement

Everything lands in `window.dataLayer`, ready for GTM (GTM4WP) and GA4:
`experiment_impression`, `cta_click` (button clicks, with the experiment variant), `calculator_start`, `calculator_complete` (with headcount and total),
`resume_download`, `contact_click`, `outbound_click`.

### SEO and schema

Person + ProfilePage schema joins Yoast's graph through `wpseo_schema_graph` / `wpseo_schema_webpage`
(standalone JSON-LD when Yoast is off). Profile fields are editable through an ACF field group on the
front page.

### Plugins in the blueprint

Yoast SEO, GTM4WP, Advanced Custom Fields, Performance Lab, Accessibility Checker, Redirection,
Query Monitor, Simple History.

## OnPay homepage A/B test (second blueprint)

onpay.com's homepage rebuilt as a reusable block theme, running a server-side A/B test. Concept for a job
application; not affiliated with OnPay. The **Experiment brief** page in the header has the hypothesis,
metrics and sample size.

- **A (control):** today's 12-section page, static hero screenshot.
- **B (experts):** 6 sections that lead with OnPay's human support. Oversized type and pinned scroll
  sections (CSS only), so the shorter page still feels substantial. The product shots are animated
  stageshow scenes rebuilt from OnPay's dashboard mock.

| Path | What it is |
| --- | --- |
| `theme/onpay-concept` | Block theme. `theme.json` holds OnPay's tokens (palette with AA-safe button and eyebrow colors, self-hosted Poppins, fluid type, spacing, shadows). Each section is a pattern (categories: control, experts). Block styles: sticky stack, screen, card, glass card, display heading, button styles. |
| `tools/onpay_patterns.py` | Writes the 18 patterns with valid block markup (`pnpm onpay:patterns`). |
| `stageshow/` | The stageshow kit and the two OnPay scenes, copied from the stageshow repo (`pnpm stageshow:sync`), bundled for the `cb/stage` block (`pnpm build:stageshow`). |
| `plugin/cb-resume-blocks/inc/consent.php` | Consent Mode v2 defaults (denied, so no banner on arrival), Global Privacy Control, and Interactivity API cookie choices opened from Manage Cookies, for themes that declare `add_theme_support( 'cb-consent' )`. |
| `tests/onpay.spec.mjs` | Playwright + axe: WCAG 2.1 AA per variant, zoom, one `<main>`, consent and GPC, experiment events, lazy scenes, CLS under 0.1. |

```sh
pnpm serve:onpay   # Playground CLI at https://onpay.wp-resume.localhost
pnpm test:onpay    # starts serve:onpay if it isn't running
```

## Develop

```sh
mise run setup  # once: tools, deps, trusts the portless HTTPS cert (one admin prompt)
pnpm build      # wp-scripts: blocks + Interactivity API view module
pnpm test       # calculator math against hand-computed cases (node:test)
pnpm lint:js
pnpm serve      # Playground CLI at https://wp-resume.localhost with theme + plugin mounted
pnpm content    # regenerate theme/cb-resume/content/resume.html from tools/gen.py
```

Resume content lives in `tools/gen.py`, which writes the block markup the blueprint seeds. After `pnpm content`, restart `pnpm serve` to reseed the page.

`plugin/cb-resume-blocks/build` is committed so the blueprint can install straight from git.
