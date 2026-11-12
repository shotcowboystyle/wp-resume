import { store, getContext } from '@wordpress/interactivity';
import { employerCost } from './calc.js';

const usd = new Intl.NumberFormat( 'en-US', {
	style: 'currency',
	currency: 'USD',
	maximumFractionDigits: 0,
} );

// Same keys and formatting as cb_resume_format_cost() in inc/payroll.php.
const fmt = ( r ) => ( {
	annualTotal: usd.format( r.annualTotal ),
	annualTaxes: usd.format( r.annualTaxes ),
	perPayroll: usd.format( r.perPayroll ),
	taxesPerHead: usd.format( r.taxesPerEmployee ),
	socialSecurity: usd.format( r.perEmployee.socialSecurity ),
	medicare: usd.format( r.perEmployee.medicare ),
	futa: usd.format( r.perEmployee.futa ),
	suta: usd.format( r.perEmployee.suta ),
	effectiveRate: `${ +r.effectiveRate.toFixed( 2 ) }%`,
} );

const push = ( data ) =>
	( window.dataLayer = window.dataLayer || [] ).push( data );

store( 'cb/payroll', {
	actions: {
		start() {
			const ctx = getContext();
			if ( ctx.started ) {
				return;
			}
			ctx.started = true;
			push( {
				event: 'calculator_start',
				calculator: 'employer_payroll_cost',
			} );
		},
		calculate( event ) {
			event.preventDefault();
			const ctx = getContext();
			const input = Object.fromEntries( new FormData( event.target ) );
			const result = employerCost( input );
			ctx.fmt = fmt( result );
			ctx.calculated = true;
			push( {
				event: 'calculator_complete',
				calculator: 'employer_payroll_cost',
				employees: Number( input.employees ),
				pay_periods: Number( input.payPeriods ),
				annual_total: result.annualTotal,
			} );
		},
	},
} );
