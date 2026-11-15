<?php
/**
 * Title: Experiment brief
 * Slug: onpay-concept/experiment-brief
 * Categories: onpay
 * Description: Hypothesis, metrics and audit fixes for the homepage test.
 */
?>
<!-- wp:paragraph -->
<p>A homepage A/B test for onpay.com, built as a reusable WordPress block theme. Both variants also fix the three findings from my November 2026 audit of the live site. Open each one directly:</p>
<!-- /wp:paragraph -->
<!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="/?cb_variant=a">See variant A (control)</a></div>
<!-- /wp:button -->
<!-- wp:button {"className":"is-style-secondary"} -->
<div class="wp-block-button is-style-secondary"><a class="wp-block-button__link wp-element-button" href="/?cb_variant=b">See variant B (experts)</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
<!-- wp:heading -->
<h2 class="wp-block-heading">Hypothesis</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>Today’s homepage has 12 sections. Owners comparing payroll providers are increasingly offered AI-first tools with no people behind them. <strong>If the homepage leads with OnPay’s human experts, says it in fewer words and keeps the page substantial with oversized type and long, pinned scroll sections, then more visitors will click Get started</strong>, because the value is understood faster and the difference from AI-only competitors is clear.</p>
<!-- /wp:paragraph -->
<!-- wp:heading -->
<h2 class="wp-block-heading">Variants</h2>
<!-- /wp:heading -->
<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th></th><th>A: control</th><th>B: experts</th></tr></thead><tbody><tr><td>Sections</td><td>12 (today’s page)</td><td>6, each a full screen or longer</td></tr><tr><td>Lead message</td><td>Powerful people tech, backed by real experts</td><td>Payroll backed by real people</td></tr><tr><td>Product imagery</td><td>Static dashboard PNG (as today)</td><td>Animated stageshow scenes: an expert chat and the dashboard</td></tr><tr><td>Layout</td><td>Standard sections</td><td>Display type, pinned panels, scroll-driven reveals (CSS only)</td></tr></tbody></table></figure>
<!-- /wp:table -->
<!-- wp:heading -->
<h2 class="wp-block-heading">Measurement</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>Primary:</strong> Get started click-through per session (<code>cta_click</code> with <code>experiment_variant</code>, then the /get-started/ form start in GA4 and HubSpot).</li>
<!-- /wp:list-item -->
<!-- wp:list-item -->
<li><strong>Guardrails:</strong> bounce rate, 75% scroll depth, Talk to an expert clicks (support load), LCP/INP/CLS per variant.</li>
<!-- /wp:list-item -->
<!-- wp:list-item -->
<li><strong>Assignment:</strong> server-side, 50/50, sticky for 30 days by first-party cookie, no flicker. <code>experiment_impression</code> fires once per view. QA links force a variant without storing it.</li>
<!-- /wp:list-item -->
<!-- wp:list-item -->
<li><strong>Sample size:</strong> needs OnPay’s real baseline. At an assumed 4% click-through, detecting a 10% relative lift (to 4.4%) at 95% confidence and 80% power needs about 39,500 sessions per variant; run at least two full weeks so weekday patterns even out.</li>
<!-- /wp:list-item -->
<!-- wp:list-item -->
<li><strong>Caching:</strong> assignment responses are sent <code>Cache-Control: private</code> with <code>Vary: Cookie</code>. On NitroPack and Cloudflare, cache per variant cookie or assign at the edge.</li>
<!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
<!-- wp:heading -->
<h2 class="wp-block-heading">Audit findings fixed in this theme</h2>
<!-- /wp:heading -->
<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>Finding (Nov 2026 audit)</th><th>Fix here</th></tr></thead><tbody><tr><td>Tags fired after cookies were declined; no Consent Mode signal; GPC ignored</td><td>Consent Mode v2 defaults to denied before any tag, so no banner has to interrupt the first visit; Manage Cookies (footer) opens the choices, built with the Interactivity API; the stored choice is re-applied on every page; GPC keeps ad consent denied</td></tr><tr><td>Zoom blocked (<code>user-scalable=no</code>)</td><td>WordPress’s default viewport: pinch zoom works</td></tr><tr><td>Unnamed menu toggle and social links</td><td>Core Navigation and Social Links blocks, which name both</td></tr><tr><td>Missing <code>&lt;main&gt;</code>, skipped heading levels, missing alt text</td><td>Templates wrap content in <code>&lt;main&gt;</code>; patterns keep heading order; every informative image has alt text</td></tr><tr><td>Color contrast failures</td><td>Buttons use #0a7f5c (5.0:1) instead of #11a77a (3.1:1); eyebrows on blue use mint (7.7:1). The tokens are in theme.json</td></tr><tr><td>Layout shift on home (CLS 0.27)</td><td>Fixed-size frames for every image and scene; the cookie choices open as an overlay; Poppins is preloaded and self-hosted</td></tr><tr><td>reCAPTCHA on every page (about 1.5 MB)</td><td>None on this page; on the real site, load it when a form field first gets focus</td></tr></tbody></table></figure>
<!-- /wp:table -->
<!-- wp:heading -->
<h2 class="wp-block-heading">How it’s built</h2>
<!-- /wp:heading -->
<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>Design system:</strong> theme.json holds the palette, Poppins, fluid type scale, spacing, shadows and radii; block styles (sticky stack, card, display heading, button styles) carry the rest.</li>
<!-- /wp:list-item -->
<!-- wp:list-item -->
<li><strong>Reusable:</strong> every section is a pattern in two categories (control and experts), so any page can be assembled from them in the editor.</li>
<!-- /wp:list-item -->
<!-- wp:list-item -->
<li><strong>Experiment block:</strong> <code>cb/experiment</code> wraps the two variants on the front-page template.</li>
<!-- /wp:list-item -->
<!-- wp:list-item -->
<li><strong>Product scenes:</strong> <code>cb/stage</code> server-renders a sized poster, then loads a 44 KB (gzip) Preact build of the stageshow scenes when the scene nears the viewport. Under reduced motion the poster stays.</li>
<!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
