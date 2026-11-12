// Dot nav + .is-active on the slide in view, and fade-up reveals for blocks and heading letters.
const slides = [ ...document.querySelectorAll( '[class*="is-style-slide"]' ) ];

// Keep in sync with the reveal selectors in style.css.
const REVEAL = [
	'[class*="is-style-slide"] > :not(.wp-block-cb-timeline, .wp-block-columns, h1, h2)',
	'[class*="is-style-slide"] .wp-block-cb-timeline-item',
	'[class*="is-style-slide"] > .wp-block-columns > .wp-block-column > *',
].join( ',' );
const HEADINGS = '[class*="is-style-slide"] > :is(h1, h2)';

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

// Wraps each letter in .cb-char (inside a nowrap .cb-word); screen readers get the plain text.
function split( heading ) {
	const plain = heading.cloneNode( true );
	plain.querySelectorAll( 'br' ).forEach( ( br ) => br.replaceWith( ' ' ) );

	let i = 0;
	const walk = ( node ) => {
		for ( const child of [ ...node.childNodes ] ) {
			if ( child.nodeType === 1 ) {
				walk( child );
				continue;
			}
			if ( child.nodeType !== 3 ) {
				continue;
			}
			const frag = document.createDocumentFragment();
			for ( const part of child.textContent.split( /(\s+)/ ) ) {
				if ( ! part ) {
					continue;
				}
				if ( /^\s+$/.test( part ) ) {
					frag.append( ' ' );
					continue;
				}
				const word = document.createElement( 'span' );
				word.className = 'cb-word';
				for ( const ch of part ) {
					const c = document.createElement( 'span' );
					c.className = 'cb-char';
					c.style.setProperty( '--i', i++ );
					c.textContent = ch;
					word.append( c );
				}
				frag.append( word );
			}
			child.replaceWith( frag );
		}
	};
	walk( heading );

	const visual = document.createElement( 'span' );
	visual.setAttribute( 'aria-hidden', 'true' );
	visual.append( ...heading.childNodes );
	const sr = document.createElement( 'span' );
	sr.className = 'screen-reader-text';
	sr.textContent = plain.textContent.replace( /\s+/g, ' ' ).trim();
	heading.append( sr, visual );
	heading.classList.add( 'cb-split' );
}

if ( window.matchMedia( '(prefers-reduced-motion: no-preference)' ).matches ) {
	const headings = [ ...document.querySelectorAll( HEADINGS ) ];
	headings.forEach( split );

	// Everything that enters in the same frame is staggered in document order.
	const reveal = new window.IntersectionObserver(
		( entries ) => {
			let n = 0;
			for ( const entry of entries ) {
				if ( ! entry.isIntersecting ) {
					continue;
				}
				const delay = Math.min( n++, 8 ) * 90;
				entry.target.style.setProperty( '--d', `${ delay }ms` );
				entry.target.classList.add( 'is-in' );
				reveal.unobserve( entry.target );
			}
		},
		{ rootMargin: '0px 0px -8% 0px' }
	);
	// One combined query returns document order, so batches stagger top to bottom.
	document
		.querySelectorAll( `${ HEADINGS }, ${ REVEAL }` )
		.forEach( ( el ) => reveal.observe( el ) );
}
