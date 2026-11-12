<?php
/** @var array $attributes */
$years   = max( 0, (float) $attributes['years'] );
$max     = max( 1, (float) $attributes['max'] );
$display = 'ring' === $attributes['display'] ? 'ring' : 'bar';
$num     = $years . ( $years >= $max ? '+' : '' );
$meta    = $num . ' yrs' . ( ! empty( $attributes['since'] ) ? ' · since ' . (int) $attributes['since'] : '' );
$label   = wp_kses_post( $attributes['label'] );
$wrapper = get_block_wrapper_attributes(
	array(
		'class' => "is-{$display}",
		'style' => '--value:' . round( min( $years / $max, 1 ), 3 ),
	)
);
?>
<div <?php echo $wrapper; ?>>
<?php if ( 'ring' === $display ) : ?>
	<div class="wp-block-cb-skill__ring" aria-hidden="true"><span class="wp-block-cb-skill__num"><?php echo esc_html( $num ); ?></span></div>
	<p class="wp-block-cb-skill__label"><?php echo $label; ?></p>
	<p class="wp-block-cb-skill__meta"><?php echo esc_html( $meta ); ?></p>
<?php else : ?>
	<p class="wp-block-cb-skill__label"><span><?php echo $label; ?></span> <span class="wp-block-cb-skill__meta"><?php echo esc_html( $meta ); ?></span></p>
	<div class="wp-block-cb-skill__track" aria-hidden="true"><span class="wp-block-cb-skill__fill"></span></div>
<?php endif; ?>
</div>
