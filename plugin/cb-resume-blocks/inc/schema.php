<?php
/**
 * Person schema for the front page. Profile fields are editable through ACF when it is active
 * (optional dependency); the defaults below are used otherwise. When Yoast SEO is active the
 * Person joins Yoast's graph instead of printing a second JSON-LD block.
 */

defined( 'ABSPATH' ) || exit;

const CB_RESUME_PROFILE_DEFAULTS = array(
	'job_title'   => 'Senior Web Developer, Marketing',
	'email'       => 'curt.blanton@gmail.com',
	'telephone'   => '+1-843-513-8134',
	'same_as'     => "https://shotcowboystyle.github.io\nhttps://github.com/shotcowboystyle",
	'knows_about' => "WordPress\nGutenberg blocks\nGoogle Tag Manager\nGA4\nA/B testing\nHubSpot\nCore Web Vitals\nWCAG 2.1 AA\nTechnical SEO",
);

add_action(
	'acf/include_fields',
	function () {
		if ( ! function_exists( 'acf_add_local_field_group' ) ) {
			return;
		}
		$fields = array();
		foreach ( CB_RESUME_PROFILE_DEFAULTS as $name => $default ) {
			$multi    = str_contains( $default, "\n" );
			$fields[] = array(
				'key'           => "field_cb_resume_{$name}",
				'label'         => ucwords( str_replace( '_', ' ', $name ) ),
				'name'          => $name,
				'type'          => $multi ? 'textarea' : 'text',
				'instructions'  => $multi ? 'One per line.' : '',
				'default_value' => $default,
			);
		}
		acf_add_local_field_group(
			array(
				'key'      => 'group_cb_resume_profile',
				'title'    => 'Resume profile (Person schema)',
				'fields'   => $fields,
				'location' => array( array( array( 'param' => 'page_type', 'operator' => '==', 'value' => 'front_page' ) ) ),
				'position' => 'side',
			)
		);
	}
);

function cb_resume_profile( string $key ): string {
	$value = function_exists( 'get_field' ) ? get_field( $key, (int) get_option( 'page_on_front' ) ) : null;
	return $value ? (string) $value : CB_RESUME_PROFILE_DEFAULTS[ $key ];
}

function cb_resume_person(): array {
	$lines = fn( $key ) => array_values( array_filter( array_map( 'trim', explode( "\n", cb_resume_profile( $key ) ) ) ) );
	return array(
		'@type'       => 'Person',
		'@id'         => home_url( '/#/schema/person/curtis-blanton' ),
		'name'        => 'Curtis Blanton',
		'jobTitle'    => cb_resume_profile( 'job_title' ),
		'email'       => 'mailto:' . cb_resume_profile( 'email' ),
		'telephone'   => cb_resume_profile( 'telephone' ),
		'url'         => home_url( '/' ),
		'sameAs'      => $lines( 'same_as' ),
		'knowsAbout'  => $lines( 'knows_about' ),
		'homeLocation' => array( '@type' => 'Place', 'name' => 'Charleston, SC' ),
	);
}

add_filter(
	'wpseo_schema_graph',
	function ( $graph ) {
		if ( is_front_page() ) {
			$graph[] = cb_resume_person();
		}
		return $graph;
	}
);

// With Yoast, mark its front-page WebPage as a ProfilePage about the Person.
add_filter(
	'wpseo_schema_webpage',
	function ( $piece ) {
		if ( is_front_page() ) {
			$piece['@type']      = array( 'WebPage', 'ProfilePage' );
			$piece['mainEntity'] = array( '@id' => cb_resume_person()['@id'] );
		}
		return $piece;
	}
);

add_action(
	'wp_head',
	function () {
		if ( defined( 'WPSEO_VERSION' ) || ! is_front_page() ) {
			return; // Yoast prints it via the graph filter above.
		}
		$data = array(
			'@context'   => 'https://schema.org',
			'@type'      => 'ProfilePage',
			'mainEntity' => cb_resume_person(),
		);
		echo '<script type="application/ld+json">' . wp_json_encode( $data, JSON_UNESCAPED_SLASHES ) . "</script>\n";
	}
);
