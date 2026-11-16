// Loads the stageshow bundle only when a scene nears the viewport, and never
// under reduced motion: there the server-rendered poster is the scene.
const hosts = document.querySelectorAll( '[data-stageshow]' );
const reduced = window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

let bundle;
const load = ( host ) => {
	if ( ! bundle ) {
		const css = document.createElement( 'link' );
		css.rel = 'stylesheet';
		css.href = host.dataset.css;
		document.head.append( css );
		bundle = import( /* webpackIgnore: true */ host.dataset.module );
	}
	return bundle.then( ( m ) => m.mount( host ) );
};

if ( hosts.length && ! reduced && 'IntersectionObserver' in window ) {
	const io = new window.IntersectionObserver(
		( entries ) => {
			for ( const e of entries ) {
				if ( e.isIntersecting ) {
					io.unobserve( e.target );
					load( e.target );
				}
			}
		},
		{ rootMargin: '200px' }
	);
	hosts.forEach( ( h ) => io.observe( h ) );
}
