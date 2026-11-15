// Pushes link-level conversions to the GTM dataLayer (GTM4WP or any container picks them up).
window.dataLayer = window.dataLayer || [];

document.addEventListener( 'click', ( e ) => {
	const a = e.target.closest( 'a[href]' );
	if ( ! a ) {
		return;
	}

	// Button clicks are the conversions an experiment is judged on, so they carry
	// the variant the visitor saw (from the cb/experiment wrapper around them).
	if ( a.classList.contains( 'wp-block-button__link' ) ) {
		const exp = a.closest( '[data-experiment]' );
		window.dataLayer.push( {
			event: 'cta_click',
			cta_text: a.textContent.trim().slice( 0, 100 ),
			link_url: a.href,
			experiment_id: exp ? exp.dataset.experiment : undefined,
			experiment_variant: exp ? exp.dataset.variant : undefined,
		} );
	}

	const href = a.getAttribute( 'href' );
	let event;
	if ( /\.pdf($|[?#])/i.test( href ) ) {
		event = 'resume_download';
	} else if ( /^(mailto|tel):/i.test( href ) ) {
		event = 'contact_click';
	} else if ( a.host && a.host !== window.location.host ) {
		event = 'outbound_click';
	}
	if ( ! event ) {
		return;
	}

	window.dataLayer.push( {
		event,
		link_url: a.href,
		link_text: a.textContent.trim().slice( 0, 100 ),
	} );
} );
