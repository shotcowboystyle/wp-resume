<?php
/**
 * Consent that actually controls the tags. A theme opts in with
 * add_theme_support( 'cb-consent' ). Fixes audit finding 1:
 * - Google Consent Mode v2 defaults to denied before any tag can load;
 * - a stored choice is re-applied on every page before tags run;
 * - Global Privacy Control keeps advertising consent denied whatever is chosen;
 * - "Manage cookies" opens the choices (Interactivity API) and updates consent
 *   live. Nothing prompts on arrival: without a choice, consent stays denied.
 * GTM tags then gate on the consent types (built-in consent checks), and Google
 * models conversions it cannot observe.
 */

defined( 'ABSPATH' ) || exit;

add_action(
	'wp_head',
	function () {
		if ( ! current_theme_supports( 'cb-consent' ) ) {
			return;
		}
		?>
<script id="cb-consent-default">
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push( arguments ); }
( function () {
	var gpc = navigator.globalPrivacyControl === true;
	var m = document.cookie.match( /(?:^|; )cb_consent=([^;]*)/ );
	var c = m ? decodeURIComponent( m[1] ).split( ',' ) : null;
	gtag( 'consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied', functionality_storage: 'granted', security_storage: 'granted', wait_for_update: 500 } );
	gtag( 'set', 'ads_data_redaction', true );
	if ( c ) {
		var ads = ! gpc && c.indexOf( 'marketing' ) > -1 ? 'granted' : 'denied';
		gtag( 'consent', 'update', { analytics_storage: c.indexOf( 'analytics' ) > -1 ? 'granted' : 'denied', ad_storage: ads, ad_user_data: ads, ad_personalization: ads } );
	}
} )();
</script>
		<?php
	},
	0
);

add_action(
	'wp_enqueue_scripts',
	function () {
		if ( ! current_theme_supports( 'cb-consent' ) ) {
			return;
		}
		wp_register_script_module(
			'cb-consent',
			plugins_url( 'assets/consent.js', dirname( __DIR__ ) . '/cb-resume-blocks.php' ),
			array( '@wordpress/interactivity' ),
			'1.0.0'
		);
		wp_enqueue_script_module( 'cb-consent' );
		wp_enqueue_style( 'cb-consent', plugins_url( 'assets/consent.css', dirname( __DIR__ ) . '/cb-resume-blocks.php' ), array(), '1.0.0' );
	}
);

add_action(
	'wp_footer',
	function () {
		if ( ! current_theme_supports( 'cb-consent' ) ) {
			return;
		}
		ob_start();
		?>
<section class="cb-consent" aria-labelledby="cb-consent-title" data-wp-interactive="cb/consent" data-wp-init="callbacks.init" data-wp-bind--hidden="!state.open" data-wp-on-document--click="callbacks.manageLink" hidden>
	<h2 id="cb-consent-title" class="cb-consent__title"><?php esc_html_e( 'Your cookie choices', 'cb-resume-blocks' ); ?></h2>
	<p><?php esc_html_e( 'We use analytics to improve this site and marketing cookies to measure ads. Nothing beyond what the site needs to work runs until you choose.', 'cb-resume-blocks' ); ?></p>
	<p class="cb-consent__gpc" data-wp-bind--hidden="!state.gpc"><?php esc_html_e( 'Your browser sends Global Privacy Control, so marketing cookies stay off.', 'cb-resume-blocks' ); ?></p>
	<details class="cb-consent__choose">
		<summary><?php esc_html_e( 'Choose', 'cb-resume-blocks' ); ?></summary>
		<label><input type="checkbox" checked disabled> <?php esc_html_e( 'Necessary (always on)', 'cb-resume-blocks' ); ?></label>
		<label><input type="checkbox" name="analytics" data-wp-bind--checked="state.analytics" data-wp-on--change="actions.toggle"> <?php esc_html_e( 'Analytics', 'cb-resume-blocks' ); ?></label>
		<label><input type="checkbox" name="marketing" data-wp-bind--checked="state.marketing" data-wp-bind--disabled="state.gpc" data-wp-on--change="actions.toggle"> <?php esc_html_e( 'Marketing', 'cb-resume-blocks' ); ?></label>
		<button type="button" class="cb-consent__btn" data-wp-on--click="actions.save"><?php esc_html_e( 'Save choices', 'cb-resume-blocks' ); ?></button>
	</details>
	<div class="cb-consent__actions">
		<button type="button" class="cb-consent__btn" data-wp-on--click="actions.reject"><?php esc_html_e( 'Reject all', 'cb-resume-blocks' ); ?></button>
		<button type="button" class="cb-consent__btn cb-consent__btn--primary" data-wp-on--click="actions.accept"><?php esc_html_e( 'Accept all', 'cb-resume-blocks' ); ?></button>
	</div>
</section>
		<?php
		echo wp_interactivity_process_directives( ob_get_clean() ); // phpcs:ignore WordPress.Security.EscapeOutput
	}
);
