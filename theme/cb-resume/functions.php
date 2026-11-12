<?php
/**
 * CB Resume theme: assets, block styles, and the one-time content seed the blueprint runs.
 */

defined( 'ABSPATH' ) || exit;

add_action(
	'after_setup_theme',
	function () {
		add_theme_support( 'editor-styles' );
		add_editor_style( 'style.css' );
	}
);

add_action(
	'wp_enqueue_scripts',
	function () {
		$ver = wp_get_theme()->get( 'Version' );
		wp_enqueue_style( 'cb-resume', get_stylesheet_uri(), array(), $ver );
		wp_enqueue_script(
			'cb-resume-slides',
			get_theme_file_uri( 'assets/js/slides.js' ),
			array(),
			$ver,
			array( 'strategy' => 'defer', 'in_footer' => true )
		);
	}
);

// Flag JS early so reveal styles never hide content from no-JS visitors.
add_action(
	'wp_head',
	function () {
		echo "<script>document.documentElement.classList.add('cb-js')</script>\n";
	},
	1
);

add_action(
	'init',
	function () {
		$slides = array(
			'slide-gold'       => __( 'Slide: gold circle', 'cb-resume' ),
			'slide-sage'       => __( 'Slide: sage circle', 'cb-resume' ),
			'slide-terracotta' => __( 'Slide: terracotta circle', 'cb-resume' ),
			'slide-cream'      => __( 'Slide: cream', 'cb-resume' ),
		);
		foreach ( $slides as $name => $label ) {
			register_block_style( 'core/group', array( 'name' => $name, 'label' => $label ) );
		}
		register_block_style( 'core/paragraph', array( 'name' => 'eyebrow', 'label' => __( 'Eyebrow', 'cb-resume' ) ) );
	}
);

/**
 * Creates the resume page from content/resume.html and makes it the front page.
 * Run once by the Playground blueprint; safe to re-run (updates the same page).
 */
function cb_resume_seed() {
	// Seeded markup is trusted theme content; runPHP has no user, so kses would otherwise filter it.
	kses_remove_filters();

	$content  = file_get_contents( get_theme_file_path( 'content/resume.html' ) );
	$existing = get_page_by_path( 'resume' );

	$page_id = wp_insert_post(
		array(
			'ID'           => $existing ? $existing->ID : 0,
			'post_type'    => 'page',
			'post_author'  => 1,
			'post_name'    => 'resume',
			'post_title'   => 'Curtis Blanton, Senior Web Developer',
			'post_status'  => 'publish',
			'post_content' => '',
			'post_excerpt' => 'Senior web developer who owns marketing sites end to end: WordPress, GTM and GA4, A/B and multivariate testing, HubSpot integrations, Core Web Vitals and accessibility.',
		),
		true
	);
	if ( is_wp_error( $page_id ) ) {
		throw new RuntimeException( $page_id->get_error_message() );
	}

	// Playground serves WordPress under a scoped path, so links get the real path here.
	// Root-relative: Playground's home_url() is http:// while the page is https://,
	// and absolute links would be blocked as mixed content.
	wp_update_post(
		array(
			'ID'           => $page_id,
			'post_content' => wp_slash( str_replace(
				array( '%THEME%', '%HOME%', '%PAGE_ID%' ),
				array(
					wp_make_link_relative( get_stylesheet_directory_uri() ),
					untrailingslashit( wp_make_link_relative( home_url( '/' ) ) ),
					(string) $page_id,
				),
				$content
			) ),
		)
	);

	// Yoast: give the page a focus keyphrase and meta description (harmless without Yoast).
	update_post_meta( $page_id, '_yoast_wpseo_focuskw', 'senior web developer' );
	update_post_meta( $page_id, '_yoast_wpseo_metadesc', 'Curtis Blanton, senior web developer: WordPress custom blocks, GTM and GA4, A/B and multivariate testing, HubSpot integrations, Core Web Vitals and WCAG 2.1 AA.' );

	update_option( 'show_on_front', 'page' );
	update_option( 'page_on_front', $page_id );
	update_option( 'blogname', 'Curtis Blanton' );
	update_option( 'blogdescription', 'Senior Web Developer, Marketing' );
	update_option( 'permalink_structure', '/%postname%/' );
	flush_rewrite_rules();

	return $page_id;
}
