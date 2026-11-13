// Prints CSS linear() easings sampled from a damped spring (mass 1), plus the duration it takes to settle.
// Usage: node tools/spring.mjs  -> paste into theme.json settings.custom.
const spring = ( stiffness, damping, points = 40 ) => {
	const dt = 1 / 600;
	let x = 0;
	let v = 0;
	const xs = [];
	// Simulate until at rest (within 0.1% for 0.1s).
	let still = 0;
	for ( let t = 0; t < 4 && still < 60; t += dt ) {
		v += ( stiffness * ( 1 - x ) - damping * v ) * dt;
		x += v * dt;
		xs.push( x );
		still = Math.abs( 1 - x ) < 0.001 && Math.abs( v ) < 0.01 ? still + 1 : 0;
	}
	const step = ( xs.length - 1 ) / ( points - 1 );
	const stops = Array.from( { length: points }, ( _, i ) =>
		i === points - 1 ? 1 : +xs[ Math.round( i * step ) ].toFixed( 3 )
	);
	return { css: `linear(0, ${ stops.slice( 1 ).join( ', ' ) })`, ms: Math.round( xs.length * dt * 1000 ) };
};

const out = {
	'spring (overshoot)': spring( 170, 15 ),
	'settle (critically damped)': spring( 120, 22 ),
	'bounce (playful)': spring( 260, 12 ),
};
for ( const [ name, { css, ms } ] of Object.entries( out ) ) {
	console.log( `${ name } ~${ ms }ms\n${ css }\n` );
}
