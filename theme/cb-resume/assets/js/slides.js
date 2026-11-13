// Dot nav, header state, spring-driven discs, fade-up reveals for blocks and heading letters, count-ups.
const slides = [ ...document.querySelectorAll( '[class*="is-style-slide"]' ) ];
const motion = window.matchMedia(
	'(prefers-reduced-motion: no-preference)'
).matches;

// Keep in sync with the reveal selectors in style.css.
const REVEAL = [
	'[class*="is-style-slide"] > :not(.wp-block-cb-timeline, .wp-block-columns, .cb-experience-grid, h1, h2)',
	'[class*="is-style-slide"] .wp-block-cb-timeline-item',
	'[class*="is-style-slide"] > .wp-block-columns > .wp-block-column > *',
].join( ',' );
const HEADINGS = '[class*="is-style-slide"] > :is(h1, h2)';

// A damped spring (mass 1), stepped with semi-implicit Euler. Returns true while still moving.
function spring( stiffness, damping, x = 0 ) {
	const s = { x, v: 0, to: x };
	s.step = ( dt ) => {
		s.v += ( stiffness * ( s.to - s.x ) - damping * s.v ) * dt;
		s.x += s.v * dt;
		return Math.abs( s.to - s.x ) > 0.01 || Math.abs( s.v ) > 0.01;
	};
	return s;
}

// Runs fn( dt ) every frame until it returns false.
function animate( fn ) {
	let last = performance.now();
	const frame = ( now ) => {
		const dt = Math.min( ( now - last ) / 1000, 1 / 30 );
		last = now;
		if ( fn( dt ) ) {
			window.requestAnimationFrame( frame );
		}
	};
	window.requestAnimationFrame( frame );
}

/* ---------- Experience: two columns, expandable roles ----------
   Roles marked .is-earlier move into a compact list beside the main ones, and each role's
   details fold behind a button on its title (newest open). Without JS it stays one open list. */

document
	.querySelectorAll( '#experience > .wp-block-cb-timeline' )
	.forEach( ( list ) => {
		const earlier = list.querySelectorAll( '.is-earlier' );
		if ( ! earlier.length ) {
			return;
		}
		const grid = document.createElement( 'div' );
		grid.className = 'cb-experience-grid alignwide';
		const aside = document.createElement( 'div' );
		aside.className = 'cb-experience-earlier';
		const label = document.createElement( 'p' );
		label.className = 'is-style-eyebrow';
		label.id = 'cb-earlier-label';
		label.textContent = 'Earlier';
		const ol = document.createElement( 'ol' );
		ol.className = list.className;
		ol.setAttribute( 'aria-labelledby', label.id );
		// Compact rows: the date moves after the organization on one line.
		earlier.forEach( ( item ) =>
			item
				.querySelector( '.wp-block-cb-timeline-item__org' )
				?.after(
					item.querySelector( '.wp-block-cb-timeline-item__date' )
				)
		);
		ol.append( ...earlier );
		aside.append( label, ol );
		list.replaceWith( grid );
		grid.append( list, aside );
	} );

document
	.querySelectorAll( '#experience .wp-block-cb-timeline-item' )
	.forEach( ( item, i ) => {
		const body = item.querySelector( '.wp-block-cb-timeline-item__body' );
		const details = [ ...body.children ].filter(
			( el ) =>
				! el.matches(
					'.wp-block-cb-timeline-item__title, .wp-block-cb-timeline-item__org, .wp-block-cb-timeline-item__date'
				)
		);
		if ( ! details.length ) {
			return;
		}
		const title = body.querySelector( '.wp-block-cb-timeline-item__title' );
		const panel = document.createElement( 'div' );
		panel.className = 'cb-collapse';
		panel.id = `cb-role-${ i + 1 }`;
		const inner = document.createElement( 'div' );
		inner.append( ...details );
		panel.append( inner );
		body.append( panel );

		const button = document.createElement( 'button' );
		button.type = 'button';
		button.className = 'cb-role-toggle';
		button.setAttribute( 'aria-controls', panel.id );
		button.append( ...title.childNodes );
		title.append( button );

		const set = ( open ) => {
			button.setAttribute( 'aria-expanded', String( open ) );
			item.classList.toggle( 'is-open', open );
			panel.inert = ! open;
		};
		item.cbSet = set;
		set( i === 0 );
		// One open role per list keeps the slide within a screen.
		button.addEventListener( 'click', () => {
			const open = button.getAttribute( 'aria-expanded' ) !== 'true';
			if ( open ) {
				item.parentElement
					.querySelectorAll( ':scope > .is-open' )
					.forEach( ( other ) => other.cbSet( false ) );
			}
			set( open );
		} );
	} );

/* ---------- Dot nav, header underline, active slide ---------- */

const header = document.querySelector( '.cb-header' );
const headerLinks = header?.querySelector( '.cb-header-links' );
let ink;
if ( headerLinks ) {
	ink = document.createElement( 'span' );
	ink.className = 'cb-header-ink';
	ink.setAttribute( 'aria-hidden', 'true' );
	headerLinks.append( ink );
}

function underline( id ) {
	if ( ! ink ) {
		return;
	}
	const link = headerLinks.querySelector( `a[href="#${ id }"]` );
	headerLinks
		.querySelectorAll( 'a' )
		.forEach( ( a ) => a.toggleAttribute( 'aria-current', a === link ) );
	ink.style.setProperty( '--on', link ? 1 : 0 );
	if ( link ) {
		ink.style.setProperty( '--x', `${ link.offsetLeft }px` );
		ink.style.setProperty( '--w', `${ link.offsetWidth }px` );
	}
}

if ( slides.length ) {
	const nav = document.createElement( 'ol' );
	nav.className = 'cb-dots';
	nav.setAttribute( 'aria-label', 'Sections' );

	const links = slides.map( ( slide, i ) => {
		slide.id ||= `slide-${ i + 1 }`;
		const label =
			slide
				.querySelector( 'h1, h2' )
				?.innerText.replace( /\s+/g, ' ' )
				.trim() || `Section ${ i + 1 }`;
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
				underline( entry.target.id );
			}
		},
		// Trigger when a slide's top passes 65% of the viewport; works for slides taller than the screen.
		{ rootMargin: '0px 0px -35% 0px' }
	);
	slides.forEach( ( s ) => io.observe( s ) );

	// A short decorative line under the intro that invites the first scroll.
	const cue = document.createElement( 'span' );
	cue.className = 'cb-scroll-cue';
	cue.setAttribute( 'aria-hidden', 'true' );
	slides[ 0 ].append( cue );
}

const onScrollHeader = () =>
	header?.classList.toggle( 'is-scrolled', window.scrollY > 24 );
onScrollHeader();
window.addEventListener( 'scroll', onScrollHeader, { passive: true } );

/* ---------- Heading letters ---------- */

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

/* ---------- Count-ups ---------- */

// Every number in the text counts up from 0 on a critically damped spring.
// Metric values get a static copy for screen readers; ring numbers are already aria-hidden.
function prepareCount( el ) {
	const text = el.textContent;
	// Single digits (2×, 2nd) gain nothing from counting and read oddly mid-way ("1nd").
	if ( ! /\d{2}/.test( text ) ) {
		return;
	}
	if ( ! el.closest( '[aria-hidden="true"]' ) ) {
		const sr = document.createElement( 'span' );
		sr.className = 'screen-reader-text';
		sr.textContent = text;
		const visual = document.createElement( 'span' );
		visual.setAttribute( 'aria-hidden', 'true' );
		el.replaceChildren( sr, visual );
		el = visual;
	}
	const parts = text.split( /(\d+)/ );
	el.textContent = parts.map( ( p, i ) => ( i % 2 ? '0' : p ) ).join( '' );
	return () => {
		const s = spring( 60, 15.5 );
		s.to = 1;
		animate( ( dt ) => {
			const moving = s.step( dt );
			const t = moving ? Math.min( s.x, 1 ) : 1;
			el.textContent = parts
				.map( ( p, i ) => ( i % 2 ? Math.round( p * t ) : p ) )
				.join( '' );
			return moving;
		} );
	};
}

/* ---------- Reveals ---------- */

if ( motion ) {
	const headings = [ ...document.querySelectorAll( HEADINGS ) ];
	headings.forEach( split );

	const counters = new Map();
	document
		.querySelectorAll(
			'.wp-block-cb-metric__value, .wp-block-cb-skill__num'
		)
		.forEach( ( el ) => {
			const start = prepareCount( el );
			if ( start ) {
				counters.set(
					el.closest( '.wp-block-cb-metric, .wp-block-cb-skill' ),
					start
				);
			}
		} );

	// Everything that enters in the same frame is staggered in document order.
	const reveal = new window.IntersectionObserver(
		( entries ) => {
			let n = 0;
			for ( const entry of entries ) {
				if ( ! entry.isIntersecting ) {
					continue;
				}
				const delay = Math.min( n++, 6 ) * 70;
				entry.target.style.setProperty( '--d', `${ delay }ms` );
				entry.target.classList.add( 'is-in' );
				const count = counters.get( entry.target );
				if ( count ) {
					window.setTimeout( count, delay + 150 );
				}
				reveal.unobserve( entry.target );
			}
		},
		{ rootMargin: '0px 0px -4% 0px' }
	);
	// One combined query returns document order, so batches stagger top to bottom.
	document
		.querySelectorAll( `${ HEADINGS }, ${ REVEAL }` )
		.forEach( ( el ) => reveal.observe( el ) );
}

/* ---------- Discs on springs ----------
   Each visible slide's disc trails the scroll (parallax) and leans toward the pointer.
   The targets move instantly; the springs catch up, overshoot a touch and settle. */

const fine = window.matchMedia(
	'(min-width: 782px) and (hover: hover)'
).matches;

if ( motion && fine && slides.length ) {
	const DEPTH = 0.14; // Disc moves at 86% of scroll speed.
	const LEAN = 18; // Max pointer offset, px.
	const visible = new Set();
	const state = new Map(
		slides.map( ( s ) => [
			s,
			{
				py: spring( 90, 14 ),
				mx: spring( 60, 11 ),
				my: spring( 60, 11 ),
			},
		] )
	);
	let pointer = { x: 0, y: 0 };
	let running = false;

	const tick = ( dt ) => {
		const vh = window.innerHeight;
		const tops = [ ...visible ].map( ( s ) => [
			s,
			s.getBoundingClientRect(),
		] );
		let moving = false;
		for ( const [ s, r ] of tops ) {
			const st = state.get( s );
			const offset = r.top + Math.min( r.height, vh ) / 2 - vh / 2;
			st.py.to = Math.max( -180, Math.min( 180, -offset * DEPTH ) );
			st.mx.to = pointer.x * LEAN;
			st.my.to = pointer.y * LEAN;
			moving =
				[ st.py.step( dt ), st.mx.step( dt ), st.my.step( dt ) ].some(
					Boolean
				) || moving;
			s.style.setProperty( '--py', `${ st.py.x.toFixed( 2 ) }px` );
			s.style.setProperty( '--mx', `${ st.mx.x.toFixed( 2 ) }px` );
			s.style.setProperty( '--my', `${ st.my.x.toFixed( 2 ) }px` );
		}
		running = moving;
		return moving;
	};
	const kick = () => {
		if ( ! running ) {
			running = true;
			animate( tick );
		}
	};

	const seen = new window.IntersectionObserver( ( entries ) => {
		for ( const e of entries ) {
			visible[ e.isIntersecting ? 'add' : 'delete' ]( e.target );
		}
		kick();
	} );
	slides.forEach( ( s ) => seen.observe( s ) );

	window.addEventListener( 'scroll', kick, { passive: true } );
	window.addEventListener(
		'pointermove',
		( e ) => {
			pointer = {
				x: ( e.clientX / window.innerWidth ) * 2 - 1,
				y: ( e.clientY / window.innerHeight ) * 2 - 1,
			};
			kick();
		},
		{ passive: true }
	);
}

/* ---------- Calculator: the total lands with a small spring each time it changes ---------- */

if ( motion ) {
	const ease = window
		.getComputedStyle( document.documentElement )
		.getPropertyValue( '--spring' )
		.trim();
	document.querySelectorAll( '.cb-payroll__total' ).forEach( ( el ) => {
		new window.MutationObserver( () =>
			el.animate(
				[
					{
						transform: 'translateY(0.25em) scale(0.96)',
						opacity: 0.4,
					},
					{ transform: 'none', opacity: 1 },
				],
				{ duration: 900, easing: ease || 'ease-out' }
			)
		).observe( el, {
			childList: true,
			characterData: true,
			subtree: true,
		} );
	} );
}
