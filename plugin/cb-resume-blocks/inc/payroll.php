<?php
/**
 * Server-side twin of src/payroll-calculator/calc.js, so the first paint is already correct
 * before the Interactivity API hydrates. Keep the two in step; calc.test.mjs pins the numbers.
 */

defined( 'ABSPATH' ) || exit;

const CB_RESUME_RATES_2026 = array(
	'ss_rate'        => 0.062,
	'ss_wage_base'   => 184500,
	'medicare_rate'  => 0.0145,
	'futa_rate'      => 0.006,
	'futa_wage_base' => 7000,
);

function cb_resume_employer_cost( array $in ): array {
	$r         = CB_RESUME_RATES_2026;
	$salary    = max( 0, (float) $in['salary'] );
	$employees = max( 0, (int) $in['employees'] );
	$suta_rate = max( 0, (float) $in['sutaRate'] ) / 100;
	$suta_base = max( 0, (float) $in['sutaWageBase'] );
	$periods   = max( 1, (int) $in['payPeriods'] );

	$per = array(
		'socialSecurity' => round( $r['ss_rate'] * min( $salary, $r['ss_wage_base'] ), 2 ),
		'medicare'       => round( $r['medicare_rate'] * $salary, 2 ),
		'futa'           => round( $r['futa_rate'] * min( $salary, $r['futa_wage_base'] ), 2 ),
		'suta'           => round( $suta_rate * min( $salary, $suta_base ), 2 ),
	);
	$taxes = round( array_sum( $per ), 2 );
	$total = round( ( $salary + $taxes ) * $employees, 2 );

	return array(
		'perEmployee'      => $per,
		'taxesPerEmployee' => $taxes,
		'annualTaxes'      => round( $taxes * $employees, 2 ),
		'annualTotal'      => $total,
		'perPayroll'       => round( $total / $periods, 2 ),
		'effectiveRate'    => $salary ? round( $taxes / $salary * 100, 2 ) : 0,
	);
}

/** Display strings, matching fmt() in view.js. */
function cb_resume_format_cost( array $res ): array {
	$usd = fn( $n ) => '$' . number_format( (float) $n );
	return array(
		'annualTotal'    => $usd( $res['annualTotal'] ),
		'annualTaxes'    => $usd( $res['annualTaxes'] ),
		'perPayroll'     => $usd( $res['perPayroll'] ),
		'taxesPerHead'   => $usd( $res['taxesPerEmployee'] ),
		'socialSecurity' => $usd( $res['perEmployee']['socialSecurity'] ),
		'medicare'       => $usd( $res['perEmployee']['medicare'] ),
		'futa'           => $usd( $res['perEmployee']['futa'] ),
		'suta'           => $usd( $res['perEmployee']['suta'] ),
		'effectiveRate'  => rtrim( rtrim( number_format( $res['effectiveRate'], 2 ), '0' ), '.' ) . '%',
	);
}
