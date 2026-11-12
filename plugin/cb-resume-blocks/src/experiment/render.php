<?php
/**
 * Picks the variant on the server so there is no flicker. Block themes render the template
 * before any output is sent, so the cookie can still be set here.
 *
 * @var array    $attributes
 * @var WP_Block $block
 */
$id     = sanitize_key( $attributes['experimentId'] );
$cookie = 'cb_exp_' . $id;
$forced = isset( $_GET['cb_variant'] ) ? sanitize_key( wp_unslash( $_GET['cb_variant'] ) ) : '';
$stored = isset( $_COOKIE[ $cookie ] ) ? sanitize_key( wp_unslash( $_COOKIE[ $cookie ] ) ) : '';

if ( in_array( $forced, array( 'a', 'b' ), true ) ) {
	$variant = $forced; // QA override, never stored.
} elseif ( in_array( $stored, array( 'a', 'b' ), true ) ) {
	$variant = $stored;
} else {
	$variant = random_int( 1, 100 ) <= (int) $attributes['split'] ? 'b' : 'a';
	if ( ! headers_sent() ) {
		setcookie(
			$cookie,
			$variant,
			array(
				'expires'  => time() + 30 * DAY_IN_SECONDS,
				'path'     => COOKIEPATH ? COOKIEPATH : '/',
				'secure'   => is_ssl(),
				'httponly' => false,
				'samesite' => 'Lax',
			)
		);
	}
}

$index = 'b' === $variant ? 1 : 0;
if ( ! isset( $block->inner_blocks[ $index ] ) ) {
	return;
}

$impression = array(
	'event'              => 'experiment_impression',
	'experiment_id'      => $id,
	'experiment_variant' => $variant,
);
?>
<div <?php echo get_block_wrapper_attributes( array( 'data-experiment' => $id, 'data-variant' => $variant ) ); ?>>
	<?php echo $block->inner_blocks[ $index ]->render(); ?>
	<script>(window.dataLayer = window.dataLayer || []).push(<?php echo wp_json_encode( $impression ); ?>);</script>
</div>
