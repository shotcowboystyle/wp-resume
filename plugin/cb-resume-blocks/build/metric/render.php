<?php
/** @var array $attributes */
$source = implode( ' · ', array_filter( array( $attributes['source'], $attributes['asOf'] ) ) );
?>
<figure <?php echo get_block_wrapper_attributes(); ?>>
	<p class="wp-block-cb-metric__value"><?php echo wp_kses_post( $attributes['value'] ); ?></p>
	<figcaption>
		<span class="wp-block-cb-metric__label"><?php echo wp_kses_post( $attributes['label'] ); ?></span>
		<?php if ( $source ) : ?>
			<span class="wp-block-cb-metric__source"><?php echo wp_kses_post( $source ); ?></span>
		<?php endif; ?>
	</figcaption>
</figure>
