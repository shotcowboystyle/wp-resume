<?php
/**
 * @var array  $attributes
 * @var string $content Rendered details (lists, paragraphs).
 */
$dates = trim( $attributes['start'] . ( $attributes['end'] ? ' – ' . $attributes['end'] : '' ) );
?>
<li <?php echo get_block_wrapper_attributes(); ?>>
	<p class="wp-block-cb-timeline-item__date"><?php echo wp_kses_post( $dates ); ?></p>
	<div class="wp-block-cb-timeline-item__body">
		<h3 class="wp-block-cb-timeline-item__title">
			<?php if ( $attributes['url'] ) : ?>
				<?php // No noreferrer: the destination sees the referrer as well as the UTM tags. ?>
				<a class="wp-block-cb-timeline-item__link" href="<?php echo esc_url( $attributes['url'] ); ?>" target="_blank" rel="noopener"><?php echo wp_kses_post( $attributes['title'] ); ?><span class="screen-reader-text"> <?php esc_html_e( '(opens in a new tab)', 'cb-resume-blocks' ); ?></span></a>
			<?php else : ?>
				<?php echo wp_kses_post( $attributes['title'] ); ?>
			<?php endif; ?>
		</h3>
		<?php if ( $attributes['org'] ) : ?>
			<p class="wp-block-cb-timeline-item__org"><?php echo wp_kses_post( $attributes['org'] ); ?></p>
		<?php endif; ?>
		<?php echo $content; ?>
	</div>
</li>
