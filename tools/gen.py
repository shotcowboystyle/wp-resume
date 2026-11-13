# Writes theme/cb-resume/content/resume.html, the block markup cb_resume_seed() imports.
# Edit the resume here, run `pnpm content`, then restart `pnpm serve` to reseed.
import json, html, pathlib
def esc(s): return html.escape(s, quote=False)
def attrs(d): return (' ' + json.dumps(d, ensure_ascii=False, separators=(',', ':'))) if d else ''
def p(text, cls=None, center=False):
    a = {'align': 'center'} if center else {}
    if cls: a['className'] = cls
    classes = ' '.join(x for x in ['has-text-align-center' if center else '', cls or ''] if x)
    c = f' class="{classes}"' if classes else ''
    return f'<!-- wp:paragraph{attrs(a)} -->\n<p{c}>{text}</p>\n<!-- /wp:paragraph -->'
def h(text, level=2):
    a = {'level': level} if level != 2 else {}
    return f'<!-- wp:heading{attrs(a)} -->\n<h{level} class="wp-block-heading">{text}</h{level}>\n<!-- /wp:heading -->'
def ul(items):
    # An item is text, or (text, className) for a styled item.
    def li(i):
        t, cls = i if isinstance(i, tuple) else (i, None)
        if not cls: return f'<!-- wp:list-item -->\n<li>{t}</li>\n<!-- /wp:list-item -->'
        return f'<!-- wp:list-item{attrs({"className": cls})} -->\n<li class="{cls}">{t}</li>\n<!-- /wp:list-item -->'
    li = ''.join(map(li, items))
    return f'<!-- wp:list -->\n<ul class="wp-block-list">{li}</ul>\n<!-- /wp:list -->'
def buttons(*bs):
    out = []
    for text, href, outline in bs:
        a = {'className': 'is-style-outline'} if outline else {}
        c = ' is-style-outline' if outline else ''
        out.append(f'<!-- wp:button{attrs(a)} -->\n<div class="wp-block-button{c}"><a class="wp-block-button__link wp-element-button" href="{href}">{text}</a></div>\n<!-- /wp:button -->')
    return '<!-- wp:buttons -->\n<div class="wp-block-buttons">' + '\n\n'.join(out) + '</div>\n<!-- /wp:buttons -->'
def cols(cells, wide=True):
    a = {'align': 'wide'} if wide else {}
    c = ' alignwide' if wide else ''
    inner = '\n\n'.join(f'<!-- wp:column -->\n<div class="wp-block-column">{x}</div>\n<!-- /wp:column -->' for x in cells)
    return f'<!-- wp:columns{attrs(a)} -->\n<div class="wp-block-columns{c}">{inner}</div>\n<!-- /wp:columns -->'
def slide(anchor, style, *blocks):
    a = {'tagName': 'section', 'anchor': anchor, 'className': f'is-style-{style}', 'layout': {'type': 'constrained'}}
    body = '\n\n'.join(blocks)
    return f'<!-- wp:group{attrs(a)} -->\n<section id="{anchor}" class="wp-block-group is-style-{style}">{body}</section>\n<!-- /wp:group -->'
def block(name, a=None, inner=None):
    if inner is None: return f'<!-- wp:{name}{attrs(a or {})} /-->'
    return f'<!-- wp:{name}{attrs(a or {})} -->\n{inner}\n<!-- /wp:{name} -->'
def timeline(items, earlier_from=None):
    # Items from index earlier_from on get .is-earlier; the theme lays them out as a compact second column.
    def item(i, s, e, t, o, b):
        # <wbr> after dots lets long domain titles wrap there on narrow screens.
        a = {'start': s, 'end': e, 'title': t.replace('.', '.<wbr>'), 'org': o}
        if earlier_from is not None and i >= earlier_from: a['className'] = 'is-earlier'
        return block('cb/timeline-item', a, ul(b))
    return block('cb/timeline', {'align': 'wide'}, '\n\n'.join(item(i, *x) for i, x in enumerate(items)))
def metric(v, l, s, d): return block('cb/metric', {'value': v, 'label': l, 'source': s, 'asOf': d})
def skill(l, y, since, disp='bar'):
    a = {'label': l, 'years': y, 'since': since}
    if disp != 'bar': a['display'] = disp
    return block('cb/skill', a)
def group(cls, *blocks):
    a = {'metadata': {'name': cls}, 'className': 'cb-experiment__variant', 'layout': {'type': 'constrained'}}
    return f'<!-- wp:group{attrs(a)} -->\n<div class="wp-block-group cb-experiment__variant">' + '\n\n'.join(blocks) + '</div>\n<!-- /wp:group -->'

S = []
S.append(slide('intro', 'slide-gold',
    p('Senior Web Developer, Marketing', 'is-style-eyebrow'),
    h('Curtis<br>Blanton', 1),
    p('I build marketing sites and own them after launch: WordPress, tracking, testing, integrations, speed and accessibility. Twenty years in, still shipping.', 'cb-lede'),
    buttons(('Download PDF resume', '%THEME%/assets/Curtis-Blanton-Resume.pdf', False), ('Try the lab', '#lab', True)),
))
S.append(slide('results', 'slide-cream',
    h('Results, with receipts'),
    p('Every number below names its source and date. Nothing is self-rated.'),
    cols([
        metric('2×', 'Monthly bar sales at Isla Suds a few months after the Hydrogen storefront launched', 'Owner report', 'Nov 2026'),
        metric('2nd', 'Wholesale retailer who found Isla Suds through the new site', 'Owner report', 'Nov 2026'),
        metric('12 of 15', 'City flood closures from the Oct 4, 2026 storm that Holy City Live’s rain model reproduces', 'City of Charleston closures', 'Oct 2026'),
        metric('90+ / 95+', 'Lighthouse budgets for Performance / Accessibility held on my portfolio', 'Lighthouse CI', 'Nov 2026'),
    ]),
))
S.append(slide('experience', 'slide-sage',
    h('Experience'),
    timeline([
        ('Oct 2025', 'Now', 'Independent Web Developer &amp; Consultant', 'Charleston, SC', [
            'Own client and company sites end to end: build, launch, hosting, DNS, GA4 tracking and support (Isla Suds, Kalmia Woods, Barrier Island Bonsai).',
            'Moved Isla Suds from a Shopify Liquid theme to a custom Hydrogen storefront when Liquid could not hit the Lighthouse scores or the scroll storytelling.',
            'Work daily with AI coding tools behind unit, end-to-end and accessibility test gates; every change is reviewed before merge.',
        ]),
        ('Dec 2023', 'Sep 2025', 'Senior Software Developer', 'Lasso', [
            'Built a block-based document editor on TipTap (ProseMirror) with custom nodes and extensions; customers used it for proposals, invoices and pitch decks.',
            'Migrated a legacy Vue 2.7 codebase to Vue 3 with the Composition API and TypeScript.',
            'Built a design system kept in two-way sync with Figma.',
        ]),
        ('Apr 2018', 'Feb 2023', 'Principal Software Architect', 'Seamless.AI (B2B SaaS)', [
            'Owned the company marketing site alongside the application: landing pages, forms, tracking and releases.',
            'Set up, QA’d and launched A/B and multivariate tests in Google Optimize, and tied ClickFunnels campaign funnels to Google Tag Manager conversion tracking.',
            'Built HubSpot, Salesforce and Zoho CRM integrations, Stripe and Salesforce webhooks, and Zapier integrations.',
            'Ran hosting and delivery on AWS (Route 53, CloudFront, S3, EC2); ingested 100GB+ a day from the browser extension.',
        ]),
        ('Feb 2015', 'Apr 2018', 'Senior Software Engineer', 'Questis (fintech)', [
            'Owned the company marketing site alongside the application, including cookie consent and reCAPTCHA; it ran on WordPress until its early-2018 move to Wix.',
            'Architected the production web app to meet financial-industry security and compliance requirements.',
            'Built the app in Angular, then in React after the October 2016 switch.',
        ]),
        ('Feb 2013', 'Feb 2015', 'Front-end Developer &amp; Designer', 'SPARC', [
            'Built the front-end design system and the brand identity for an employee recognition platform.',
        ]),
        ('2012', '', 'Technical Editor', 'Stylin’ with CSS, 3rd Edition (New Riders)', [
            'Credited technical editor of Charles Wyke-Smith’s CSS book; also built new pages and fixed bugs on the author’s site.',
        ]),
        ('Nov 2009', 'Feb 2013', 'Interface Engineer', 'PeopleMatter', [
            'Front-end engineer on the flagship SaaS hiring platform, applicant through onboarding.',
        ]),
        ('Jan 2009', 'Apr 2015', 'Freelance Web Developer', 'Independent, alongside full-time roles', [
            'WordPress sites for Zestra Laboratories, Acurit Studios, a working artist and a personal blog, plus a four-page site for Fourletter.',
        ]),
        ('Feb 2003', 'Aug 2006', 'Web Developer &amp; IT Manager', 'Vibrance Associates', [
            'Built and maintained custom WordPress themes in PHP; handled SEO and traffic reporting.',
        ]),
        ('Jun 2002', 'Jul 2008', 'Director, IT Solutions', 'Zestra Laboratories', [
            'Ran the marketing site, e-commerce, analytics and conversion tracking for SEO and paid campaigns.',
        ]),
    ], earlier_from=4),
))
# PageSpeed Insights, mobile, median of three runs (same numbers as shotcowboystyle.github.io/results).
# Source and date live once in the note under the timeline; each item shows a score strip.
def lighthouse(perf, a11y, bp, seo):
    scores = ' '.join(f'<span class="cb-lh__score"><strong>{v}</strong> {k}</span>'
                     for k, v in [('Performance', perf), ('Accessibility', a11y), ('Best practices', bp), ('SEO', seo)])
    return (f'<span class="cb-lh__label">Lighthouse mobile</span> {scores}', 'cb-lh')


S.append(slide('work', 'slide-terracotta',
    h('Selected work'),
    timeline([
        ('2026', '', 'islasuds.com', 'Shopify Hydrogen · React · GSAP · GA4', ['Storefront and wholesale portal built in about a week. Monthly bar sales roughly doubled; a second wholesale retailer found the brand through the site.', lighthouse(99, 97, 100, 100)]),
        ('2026', '', 'holycity.live', 'HTML · CSS · vanilla JavaScript · GA4', ['Four live Charleston dashboards on NOAA, USGS and FEMA data. No build step, no API keys. The rain model reproduces 12 of 15 city flood closures.', lighthouse(92, 100, 100, 100)]),
        ('2026', '', 'kalmiawoods.com', 'Astro · React · Next.js · Postgres · GA4', ['Scroll-driven site for the family mountain retreat, plus a calendar app where family and friends reserve the cabin.', lighthouse(96, 100, 100, 100)]),
        ('2026', '', 'barrierislandbonsai.com', 'Nuxt · Vue · Supabase · GA4', ['Specimen-by-specimen gallery and store, an admin app for the trees, and a WebGL Bonsai Studio.', lighthouse(91, 100, 100, 100)]),
        ('2025', '', 'shotcowboystyle.github.io', 'Astro · TypeScript · GSAP · Three.js · Umami', ['Portfolio held to Lighthouse budgets and WCAG 2.1 AA, with Playwright and axe-core in CI.', lighthouse(100, 100, 100, 100)]),
    ]),
    p('Lighthouse scores: PageSpeed Insights, mobile, median of three runs, Nov 12, 2026.', 'cb-note'),
))
S.append(slide('skills', 'slide-cream',
    h('Skills, in years'),
    p('Charted by years of hands-on use, not self-rated percentages. Years can be checked against the timeline.'),
    cols([skill('Web development', 20, 2002, 'ring'), skill('Owning marketing sites', 15, 2002, 'ring'), skill('Analytics &amp; tracking', 18, 2002, 'ring'), skill('Front-end frameworks', 17, 2009, 'ring')]),
    cols([
        '\n\n'.join([skill('HTML &amp; CSS / SCSS', 20, 2002), skill('JavaScript', 20, 2002), skill('PHP &amp; MySQL', 7, 2002), skill('WordPress themes &amp; blocks', 10, 2003), skill('React', 7, 2016)]),
        '\n\n'.join([skill('Google Tag Manager &amp; GA4', 6, 2018), skill('A/B &amp; multivariate testing', 5, 2018), skill('APIs, webhooks &amp; CRMs', 10, 2015), skill('AWS', 10, 2015), skill('TypeScript', 11, 2015)]),
    ]),
))
S.append(slide('lab', 'slide-sage',
    h('Lab'),
    block('cb/experiment', {'experimentId': 'lab-headline'}, '\n\n'.join([
        group('Variant A', p('Experiment variant A', 'is-style-eyebrow'), h('Payroll cost, in one number', 3)),
        group('Variant B', p('Experiment variant B', 'is-style-eyebrow'), h('What will your next hire really cost?', 3)),
    ])),
    block('cb/payroll-calculator'),
    p('This section is a live experiment. The headline above is one of two variants, chosen on the server with no flicker and kept by cookie. Add <code>?cb_variant=a</code> or <code>?cb_variant=b</code> to force one. Open the console and type <code>dataLayer</code> to see <code>experiment_impression</code>, <code>calculator_start</code> and <code>calculator_complete</code> fire, ready for GTM and GA4.'),
))
S.append(slide('built', 'slide-terracotta',
    h('How this site is built'),
    cols([
        ul([
            'Block theme: <code>theme.json</code> tokens, full-screen slides as <code>core/group</code> block styles, no page builder.',
            'Custom blocks: Timeline, Skill, Metric, A/B experiment, and the payroll calculator on the Interactivity API.',
            'Server-side A/B split; GA4-ready <code>dataLayer</code> events for downloads, contact clicks, the calculator and the experiment.',
            'Person and ProfilePage schema through Yoast’s graph API, editable with ACF.',
        ]),
        ul([
            'Installed: Yoast SEO, GTM4WP, Advanced Custom Fields, Performance Lab, Accessibility Checker, Redirection, Query Monitor and Simple History.',
            'Self-hosted variable fonts, no jQuery, motion off under <code>prefers-reduced-motion</code>.',
            'Shipped as a WordPress Playground blueprint: the whole site boots in your browser.',
        ]),
    ]),
    buttons(('Open it in the editor', '%HOME%/wp-admin/post.php?post=%PAGE_ID%&amp;action=edit', False), ('Code on GitHub', 'https://github.com/shotcowboystyle/wp-resume', True)),
))
S.append(slide('contact', 'slide-gold',
    h('Let’s talk'),
    p('Charleston, SC · Remote', 'is-style-eyebrow'),
    p('<a href="mailto:curt.blanton@gmail.com">curt.blanton@gmail.com</a><br><a href="tel:+18435138134">843.513.8134</a>', 'cb-contact-lines'),
    buttons(('Email me', 'mailto:curt.blanton@gmail.com', False), ('Portfolio', 'https://shotcowboystyle.github.io', True), ('GitHub', 'https://github.com/shotcowboystyle', True)),
))
out = '\n\n'.join(S) + '\n'
out_path = pathlib.Path(__file__).resolve().parent.parent / 'theme/cb-resume/content/resume.html'
out_path.write_text(out)
print(len(out))
