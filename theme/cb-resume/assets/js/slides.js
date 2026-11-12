// Marks the slide in view as .is-active (drives the CSS reveals) and builds the dot nav.
const slides = [ ...document.querySelectorAll( '[class*="is-style-slide"]' ) ];

if ( slides.length ) {
	const nav = document.createElement( 'ol' );
	nav.className = 'cb-dots';
	nav.setAttribute( 'aria-label', 'Sections' );

	const links = slides.map( ( slide, i ) => {
		slide.id ||= `slide-${ i + 1 }`;
		const label =
			slide.querySelector( 'h1, h2' )?.textContent.trim() ||
			`Section ${ i + 1 }`;
		const li = document.createElement( 'li' );
		const a = document.createElement( 'a' );
		a.href = `#${ slide.id }`;
		a.setAttribute( 'aria-label', label );
		li.append( a );
		nav.append( li );
		return a;
	} );
	document.body.append( nav );

	const io = new window.IntersectionObserver(
		( entries ) => {
			for ( const entry of entries ) {
				if ( ! entry.isIntersecting ) {
					continue;
				}
				entry.target.classList.add( 'is-active' );
				const i = slides.indexOf( entry.target );
				links.forEach( ( a, j ) =>
					a.setAttribute( 'aria-current', String( i === j ) )
				);
			}
		},
		// Trigger when a slide's top passes 65% of the viewport; works for slides taller than the screen.
		{ rootMargin: '0px 0px -35% 0px' }
	);
	slides.forEach( ( s ) => io.observe( s ) );
}
