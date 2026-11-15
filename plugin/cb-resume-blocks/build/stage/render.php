<?php
/**
 * A stageshow scene: two sized posters (wide and compact designs) and an empty
 * layer the scene mounts into. Without JS, or under reduced motion, the poster is
 * the scene. Design sizes match each scene's <Stage width height compact>.
 *
 * @var array $attributes
 */
$scenes = array(
	'onpay-dashboard' => array( 960, 660, 358, 590 ),
	'onpay-expert'    => array( 560, 560, 358, 560 ),
);
$scene  = isset( $scenes[ $attributes['scene'] ] ) ? $attributes['scene'] : 'onpay-dashboard';
list( $w, $h, $cw, $ch ) = $scenes[ $scene ];

$base     = plugins_url( 'assets/', dirname( __DIR__, 2 ) . '/cb-resume-blocks.php' );
$priority = ! empty( $attributes['priority'] );
$label    = $attributes['label'] ? $attributes['label'] : __( 'Animated product scene', 'cb-resume-blocks' );

$poster = function ( $size, $pw, $ph ) use ( $base, $scene, $priority ) {
	return sprintf(
		'<img class="wp-block-cb-stage__poster wp-block-cb-stage__poster--%1$s" src="%2$s" width="%3$d" height="%4$d" alt="" decoding="async" %5$s>',
		esc_attr( $size ),
		esc_url( $base . "posters/{$scene}-{$size}.webp" ),
		$pw,
		$ph,
		$priority ? 'fetchpriority="high"' : 'loading="lazy"'
	);
};

$wrapper = get_block_wrapper_attributes(
	array(
		'role'           => 'img',
		'aria-label'     => $label,
		'data-stageshow' => $scene,
		'data-module'    => $base . 'stageshow/stageshow.js',
		'data-css'       => $base . 'stageshow/stageshow.css',
	)
);
?>
<div <?php echo $wrapper; // phpcs:ignore WordPress.Security.EscapeOutput ?>>
	<div class="wp-block-cb-stage__frame">
		<?php echo $poster( 'wide', $w, $h ) . $poster( 'compact', $cw, $ch ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
		<div class="wp-block-cb-stage__live" data-ss-fill aria-hidden="true"></div>
	</div>
</div>
