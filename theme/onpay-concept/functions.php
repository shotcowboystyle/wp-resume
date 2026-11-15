<?php
/**
 * OnPay concept theme: an A/B test of onpay.com's homepage as a reusable block
 * theme. Design tokens live in theme.json; sections are patterns; the front-page
 * template wraps both variants in the cb/experiment block (cb-resume-blocks).
 */

defined( 'ABSPATH' ) || exit;

add_action(
	'after_setup_theme',
	function () {
		add_theme_support( 'editor-styles' );
		add_editor_style( array( 'style.css', 'assets/css/variant-b.css' ) );
		// Consent Mode v2 defaults, GPC and the banner (cb-resume-blocks/inc/consent.php).
		add_theme_support( 'cb-consent' );
	}
);

add_action(
	'wp_enqueue_scripts',
	function () {
		$ver = wp_get_theme()->get( 'Version' );
		wp_enqueue_style( 'onpay-concept', get_stylesheet_uri(), array(), $ver );
		// Variant B only: every rule is scoped to .op-b, so variant A never sees it.
		wp_enqueue_style( 'onpay-concept-b', get_theme_file_uri( 'assets/css/variant-b.css' ), array( 'onpay-concept' ), $ver );
		wp_enqueue_script( 'onpay-tabs', get_theme_file_uri( 'assets/js/tabs.js' ), array(), $ver, array( 'strategy' => 'defer', 'in_footer' => true ) );
	}
);

// The two weights above the fold, so text paints in Poppins without a swap shift.
add_action(
	'wp_head',
	function () {
		foreach ( array( 400, 600 ) as $w ) {
			printf(
				'<link rel="preload" href="%s" as="font" type="font/woff2" crossorigin>' . "\n",
				esc_url( get_theme_file_uri( "assets/fonts/poppins-latin-{$w}-normal.woff2" ) )
			);
		}
	},
	1
);

add_action(
	'init',
	function () {
		register_block_pattern_category( 'onpay', array( 'label' => __( 'OnPay: control (A)', 'onpay-concept' ) ) );
		register_block_pattern_category( 'onpay-b', array( 'label' => __( 'OnPay: experts (B)', 'onpay-concept' ) ) );

		$styles = array(
			'core/group'   => array(
				'sticky-stack' => __( 'Sticky stack: pinned panel, scrolling steps', 'onpay-concept' ),
				'card'         => __( 'Card', 'onpay-concept' ),
				'glass-card'   => __( 'Glass card (on blue)', 'onpay-concept' ),
				'screen'       => __( 'Full screen section', 'onpay-concept' ),
			),
			'core/button'  => array(
				'secondary'     => __( 'Secondary (white)', 'onpay-concept' ),
				'pill'          => __( 'Pill (promo banner)', 'onpay-concept' ),
				'on-blue'       => __( 'Quiet on blue', 'onpay-concept' ),
				'outline-white' => __( 'Outline white', 'onpay-concept' ),
				'xl'            => __( 'Extra large', 'onpay-concept' ),
			),
			'core/list'    => array( 'checks' => __( 'Checks', 'onpay-concept' ) ),
			'core/heading' => array( 'display' => __( 'Display (oversized)', 'onpay-concept' ) ),
		);
		foreach ( $styles as $block => $names ) {
			foreach ( $names as $name => $label ) {
				register_block_style( $block, array( 'name' => $name, 'label' => $label ) );
			}
		}
	}
);

// The control hero's dashboard image is the LCP element: load it first, sized.
add_filter(
	'render_block_core/image',
	function ( $html, $block ) {
		if ( str_contains( $block['attrs']['className'] ?? '', 'is-lcp' ) ) {
			$html = str_replace( '<img ', '<img fetchpriority="high" loading="eager" decoding="async" width="3185" height="2278" ', $html );
		}
		return $html;
	},
	10,
	2
);

/**
 * Creates the "Experiment brief" page and sets permalinks. The blueprint runs it
 * once; re-running updates the same page.
 */
function onpay_concept_seed() {
	update_option( 'blogname', 'OnPay concept' );
	update_option( 'blogdescription', 'Homepage A/B test, rebuilt as a WordPress block theme' );
	update_option( 'permalink_structure', '/%postname%/' );

	$existing = get_page_by_path( 'experiment-brief' );
	$page     = array(
		'post_title'   => 'Experiment brief',
		'post_name'    => 'experiment-brief',
		'post_status'  => 'publish',
		'post_type'    => 'page',
		'post_content' => '<!-- wp:pattern {"slug":"onpay-concept/experiment-brief"} /-->',
	);
	if ( $existing ) {
		$page['ID'] = $existing->ID;
	}
	wp_insert_post( $page );
	flush_rewrite_rules();
}
