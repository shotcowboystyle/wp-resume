# wp-resume

Curtis Blanton's resume, built as a WordPress site: a block theme plus a plugin of custom Gutenberg
blocks, shipped as a [WordPress Playground](https://wordpress.org/playground/) blueprint. One link boots
the whole site in your browser, logged in, with the editor a click away.

**Open it:** `https://playground.wordpress.net/?blueprint-url=https://raw.githubusercontent.com/shotcowboystyle/wp-resume/main/blueprint.json`

## What's inside

| Path | What it is |
| --- | --- |
| `theme/cb-resume` | Block theme. `theme.json` tokens (palette, Montserrat + Open Sans self-hosted variable fonts, fluid type), full-screen slides as `core/group` block styles, scroll-snap and IntersectionObserver fade-up reveals with per-letter headings (off under `prefers-reduced-motion`). No jQuery, no page builder. |
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
  variant for QA.

### Measurement

Everything lands in `window.dataLayer`, ready for GTM (GTM4WP) and GA4:
`experiment_impression`, `calculator_start`, `calculator_complete` (with headcount and total),
`resume_download`, `contact_click`, `outbound_click`.

### SEO and schema

Person + ProfilePage schema joins Yoast's graph through `wpseo_schema_graph` / `wpseo_schema_webpage`
(standalone JSON-LD when Yoast is off). Profile fields are editable through an ACF field group on the
front page.

### Plugins in the blueprint

Yoast SEO, GTM4WP, Advanced Custom Fields, Performance Lab, Accessibility Checker, Redirection,
Query Monitor, Simple History.

## Develop

```sh
pnpm install
pnpm build      # wp-scripts: blocks + Interactivity API view module
pnpm test       # calculator math against hand-computed cases (node:test)
pnpm lint:js
pnpm serve      # Playground CLI on http://127.0.0.1:9400 with theme + plugin mounted
pnpm content    # regenerate theme/cb-resume/content/resume.html from tools/gen.py
```

Resume content lives in `tools/gen.py`, which writes the block markup the blueprint seeds. After `pnpm content`, restart `pnpm serve` to reseed the page.

`plugin/cb-resume-blocks/build` is committed so the blueprint can install straight from git.
