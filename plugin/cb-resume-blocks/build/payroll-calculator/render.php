<?php
/** @var array $attributes */
$input = array(
	'salary'       => $attributes['salary'],
	'employees'    => $attributes['employees'],
	'sutaRate'     => $attributes['sutaRate'],
	'sutaWageBase' => $attributes['sutaWageBase'],
	'payPeriods'   => $attributes['payPeriods'],
);
$fmt   = cb_resume_format_cost( cb_resume_employer_cost( $input ) );
$uid   = wp_unique_id( 'cb-payroll-' );
$field = function ( string $name, string $label, $value, string $extra = '' ) use ( $uid ) {
	printf(
		'<p class="cb-payroll__field"><label for="%1$s-%2$s">%3$s</label><input id="%1$s-%2$s" name="%2$s" type="number" inputmode="decimal" min="0" value="%4$s" required %5$s></p>',
		esc_attr( $uid ),
		esc_attr( $name ),
		esc_html( $label ),
		esc_attr( $value ),
		$extra // Static attribute strings from this file only.
	);
};
$periods = array(
	52 => __( 'Weekly', 'cb-resume-blocks' ),
	26 => __( 'Every two weeks', 'cb-resume-blocks' ),
	24 => __( 'Twice a month', 'cb-resume-blocks' ),
	12 => __( 'Monthly', 'cb-resume-blocks' ),
);
$rows = array(
	'socialSecurity' => __( 'Social Security (6.2% to $184,500)', 'cb-resume-blocks' ),
	'medicare'       => __( 'Medicare (1.45%)', 'cb-resume-blocks' ),
	'futa'           => __( 'FUTA (0.6% of first $7,000)', 'cb-resume-blocks' ),
	'suta'           => __( 'SUTA (your state rate)', 'cb-resume-blocks' ),
);
?>
<div
	<?php echo get_block_wrapper_attributes(); ?>
	data-wp-interactive="cb/payroll"
	<?php echo wp_interactivity_data_wp_context( array( 'fmt' => $fmt, 'started' => false, 'calculated' => false ) ); ?>
>
	<form class="cb-payroll__form" data-wp-on--submit="actions.calculate" data-wp-on--input="actions.start">
		<?php
		$field( 'salary', __( 'Annual salary per employee ($)', 'cb-resume-blocks' ), $input['salary'], 'step="500"' );
		$field( 'employees', __( 'Employees', 'cb-resume-blocks' ), $input['employees'], 'step="1"' );
		$field( 'sutaRate', __( 'State unemployment (SUTA) rate (%)', 'cb-resume-blocks' ), $input['sutaRate'], 'step="0.01" max="20"' );
		$field( 'sutaWageBase', __( 'SUTA wage base ($)', 'cb-resume-blocks' ), $input['sutaWageBase'], 'step="100"' );
		?>
		<p class="cb-payroll__field">
			<label for="<?php echo esc_attr( $uid ); ?>-payPeriods"><?php esc_html_e( 'Pay schedule', 'cb-resume-blocks' ); ?></label>
			<select id="<?php echo esc_attr( $uid ); ?>-payPeriods" name="payPeriods">
				<?php foreach ( $periods as $n => $label ) : ?>
					<option value="<?php echo (int) $n; ?>" <?php selected( (int) $input['payPeriods'], $n ); ?>><?php echo esc_html( $label ); ?></option>
				<?php endforeach; ?>
			</select>
		</p>
		<div class="wp-block-button"><button type="submit" class="wp-block-button__link wp-element-button"><?php esc_html_e( 'Calculate', 'cb-resume-blocks' ); ?></button></div>
	</form>

	<div class="cb-payroll__results">
		<div aria-live="polite" aria-atomic="true">
		<p class="cb-payroll__eyebrow"><?php esc_html_e( 'Total annual cost to employ', 'cb-resume-blocks' ); ?></p>
		<p class="cb-payroll__total" data-wp-text="context.fmt.annualTotal"><?php echo esc_html( $fmt['annualTotal'] ); ?></p>
		<p class="cb-payroll__sub">
			<span data-wp-text="context.fmt.perPayroll"><?php echo esc_html( $fmt['perPayroll'] ); ?></span> <?php esc_html_e( 'per payroll run', 'cb-resume-blocks' ); ?> ·
			<span data-wp-text="context.fmt.annualTaxes"><?php echo esc_html( $fmt['annualTaxes'] ); ?></span> <?php esc_html_e( 'in employer taxes', 'cb-resume-blocks' ); ?>
		</p>
		</div>
		<table class="cb-payroll__table">
			<caption><?php esc_html_e( 'Employer taxes per employee, per year', 'cb-resume-blocks' ); ?></caption>
			<tbody>
				<?php foreach ( $rows as $key => $label ) : ?>
					<tr><th scope="row"><?php echo esc_html( $label ); ?></th><td data-wp-text="context.fmt.<?php echo esc_attr( $key ); ?>"><?php echo esc_html( $fmt[ $key ] ); ?></td></tr>
				<?php endforeach; ?>
				<tr class="cb-payroll__sum"><th scope="row"><?php esc_html_e( 'Total, effective rate', 'cb-resume-blocks' ); ?> <span data-wp-text="context.fmt.effectiveRate"><?php echo esc_html( $fmt['effectiveRate'] ); ?></span></th><td data-wp-text="context.fmt.taxesPerHead"><?php echo esc_html( $fmt['taxesPerHead'] ); ?></td></tr>
			</tbody>
		</table>
		<p class="cb-payroll__note"><?php esc_html_e( 'Estimate for tax year 2026. Assumes the full FUTA credit (not a credit-reduction state) and no benefits or workers’ comp. Not tax advice.', 'cb-resume-blocks' ); ?></p>
	</div>
</div>
