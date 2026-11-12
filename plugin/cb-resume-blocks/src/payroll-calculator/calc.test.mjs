import { test } from 'node:test';
import assert from 'node:assert/strict';
import { employerCost } from './calc.js';

const base = {
	employees: 1,
	sutaRate: 2.7,
	sutaWageBase: 14_000,
	payPeriods: 26,
};

test( 'salary under every wage base: all four taxes apply in full', () => {
	const r = employerCost( { ...base, salary: 60_000 } );
	// Hand-computed: 3720 + 870 + 42 + 378
	assert.deepEqual( r.perEmployee, {
		socialSecurity: 3720,
		medicare: 870,
		futa: 42,
		suta: 378,
	} );
	assert.equal( r.taxesPerEmployee, 5010 );
	assert.equal( r.annualTotal, 65_010 );
	assert.equal( r.perPayroll, 2500.38 );
	assert.equal( r.effectiveRate, 8.35 );
} );

test( 'Social Security stops at the 2026 wage base; Medicare does not', () => {
	const r = employerCost( { ...base, salary: 250_000 } );
	assert.equal( r.perEmployee.socialSecurity, 11_439 ); // SSA's stated 2026 max
	assert.equal( r.perEmployee.medicare, 3625 );
} );

test( 'scales by headcount', () => {
	const one = employerCost( { ...base, salary: 50_000 } );
	const ten = employerCost( { ...base, salary: 50_000, employees: 10 } );
	assert.equal( ten.annualTotal, one.annualTotal * 10 );
} );

test( 'junk input degrades to zero instead of NaN', () => {
	const r = employerCost( {
		salary: 'abc',
		employees: -3,
		sutaRate: '',
		sutaWageBase: null,
		payPeriods: 0,
	} );
	assert.equal( r.annualTotal, 0 );
	assert.equal( r.perPayroll, 0 );
} );
