// Turns an .op-tabs group (a row of headings + one panel per heading) into an
// ARIA tab widget. Without JS every panel shows, stacked. OnPay opens on Time.
document.querySelectorAll( '.op-tabs' ).forEach( ( root, n ) => {
	const labels = [ ...root.querySelectorAll( '.op-tablist > .op-tab-label' ) ];
	const panels = [ ...root.querySelectorAll( '.op-tabpanel' ) ];
	if ( ! labels.length || labels.length !== panels.length ) {
		return;
	}
	const list = root.querySelector( '.op-tablist' );
	list.setAttribute( 'role', 'tablist' );
	list.setAttribute( 'aria-label', 'Products' );
	const tabs = labels.map( ( h, i ) => {
		const b = document.createElement( 'button' );
		b.type = 'button';
		b.setAttribute( 'role', 'tab' );
		b.id = `op-tab-${ n }-${ i }`;
		b.dataset.tab = h.textContent.trim().toLowerCase();
		b.textContent = h.textContent.trim();
		b.setAttribute( 'aria-controls', `op-panel-${ n }-${ i }` );
		h.replaceWith( b );
		panels[ i ].id = `op-panel-${ n }-${ i }`;
		panels[ i ].setAttribute( 'role', 'tabpanel' );
		panels[ i ].setAttribute( 'aria-labelledby', b.id );
		return b;
	} );
	const select = ( i, focus ) => {
		tabs.forEach( ( t, j ) => {
			t.setAttribute( 'aria-selected', String( i === j ) );
			t.tabIndex = i === j ? 0 : -1;
			panels[ j ].hidden = i !== j;
		} );
		if ( focus ) {
			tabs[ i ].focus();
		}
	};
	tabs.forEach( ( t, i ) => {
		t.addEventListener( 'click', () => select( i ) );
		t.addEventListener( 'keydown', ( e ) => {
			const k = { ArrowRight: 1, ArrowLeft: -1 }[ e.key ];
			if ( k ) {
				select( ( i + k + tabs.length ) % tabs.length, true );
			}
		} );
	} );
	root.classList.add( 'is-ready' );
	select( tabs.length - 1 );
} );
