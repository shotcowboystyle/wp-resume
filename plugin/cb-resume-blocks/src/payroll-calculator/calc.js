// Employer-side payroll tax for 2026. Pure so it can be unit tested and shared with the view.
export const RATES_2026 = Object.freeze( {
	ssRate: 0.062,
	ssWageBase: 184_500, // SSA, announced 2025-10-24
	medicareRate: 0.0145, // no wage cap for the employer share
	futaRate: 0.006, // 6.0% less the full 5.4% state credit
	futaWageBase: 7_000,
} );

const round = ( n ) => Math.round( n * 100 ) / 100;

/**
 * Employer cost of a payroll. `sutaRate` is a percentage: 2.7 means 2.7%.
 *
 * @param {{salary:number, employees:number, sutaRate:number, sutaWageBase:number, payPeriods:number}} input Form values.
 * @param {typeof RATES_2026}                                                                          rates Tax-year constants.
 * @return {Object} Per-employee breakdown and payroll totals.
 */
export function employerCost( input, rates = RATES_2026 ) {
	const salary = Math.max( 0, Number( input.salary ) || 0 );
	const employees = Math.max(
		0,
		Math.floor( Number( input.employees ) || 0 )
	);
	const sutaRate = Math.max( 0, Number( input.sutaRate ) || 0 ) / 100;
	const sutaWageBase = Math.max( 0, Number( input.sutaWageBase ) || 0 );
	const payPeriods = Math.max(
		1,
		Math.floor( Number( input.payPeriods ) || 1 )
	);

	const perEmployee = {
		socialSecurity: round(
			rates.ssRate * Math.min( salary, rates.ssWageBase )
		),
		medicare: round( rates.medicareRate * salary ),
		futa: round( rates.futaRate * Math.min( salary, rates.futaWageBase ) ),
		suta: round( sutaRate * Math.min( salary, sutaWageBase ) ),
	};
	const taxesPerEmployee = round(
		Object.values( perEmployee ).reduce( ( a, b ) => a + b, 0 )
	);
	const annualTaxes = round( taxesPerEmployee * employees );
	const annualTotal = round( ( salary + taxesPerEmployee ) * employees );

	return {
		perEmployee,
		taxesPerEmployee,
		annualTaxes,
		annualTotal,
		perPayroll: round( annualTotal / payPeriods ),
		effectiveRate: salary
			? round( ( taxesPerEmployee / salary ) * 100 )
			: 0,
	};
}
