<?php
/**
 * Plugin Name:       CB Resume Blocks
 * Description:       Custom Gutenberg blocks for Curtis Blanton's resume: timeline, skill charts, metrics, a 2026 payroll-cost calculator (Interactivity API) and a server-side A/B experiment wrapper. Pushes GA4-ready events to the GTM dataLayer and outputs Person schema.
 * Version:           1.0.0
 * Requires at least: 6.6
 * Requires PHP:      8.1
 * Author:            Curtis Blanton
 * License:           GPL-2.0-or-later
 * Text Domain:       cb-resume-blocks
 */

defined( 'ABSPATH' ) || exit;

require __DIR__ . '/inc/payroll.php';
require __DIR__ . '/inc/schema.php';

add_action(
	'init',
	function () {
		foreach ( glob( __DIR__ . '/build/*/block.json' ) as $block_json ) {
			register_block_type( dirname( $block_json ) );
		}
	}
);

add_filter(
	'block_categories_all',
	function ( $categories ) {
		array_unshift(
			$categories,
			array(
				'slug'  => 'cb-resume',
				'title' => __( 'Resume', 'cb-resume-blocks' ),
			)
		);
		return $categories;
	}
);

// Site-wide link tracking: PDF downloads, mailto/tel and outbound clicks go to the dataLayer.
add_action(
	'wp_enqueue_scripts',
	function () {
		wp_enqueue_script(
			'cb-resume-track',
			plugins_url( 'assets/track.js', __FILE__ ),
			array(),
			'1.0.0',
			array( 'strategy' => 'defer', 'in_footer' => true )
		);
	}
);
