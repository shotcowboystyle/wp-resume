// The banner's store. Choices live in a first-party cookie (cb_consent) that the
// inline head script re-applies before tags on every page.
import { store, getElement } from '@wordpress/interactivity';

const COOKIE = 'cb_consent';
const read = () => {
	const m = document.cookie.match( /(?:^|; )cb_consent=([^;]*)/ );
	return m
		? decodeURIComponent( m[ 1 ] ).split( ',' ).filter( Boolean )
		: null;
};

const { state } = store( 'cb/consent', {
	state: {
		open: false,
		gpc: navigator.globalPrivacyControl === true,
		analytics: false,
		marketing: false,
	},
	actions: {
		toggle() {
			const { ref } = getElement();
			state[ ref.name ] = ref.checked;
		},
		accept() {
			state.analytics = true;
			state.marketing = ! state.gpc;
			commit();
		},
		reject() {
			state.analytics = false;
			state.marketing = false;
			commit();
		},
		save() {
			commit();
		},
	},
	callbacks: {
		init() {
			const saved = read();
			// No banner on arrival: until a choice is made every non-essential
			// consent type stays denied (the head defaults), which needs no prompt.
			// "Manage cookies" opens the choices.
			if ( saved ) {
				state.analytics = saved.includes( 'analytics' );
				state.marketing = ! state.gpc && saved.includes( 'marketing' );
			}
		},
		// Any "Manage cookies" link (href="#cookie-settings") reopens the banner.
		manageLink( event ) {
			if ( event.target.closest( 'a[href="#cookie-settings"]' ) ) {
				event.preventDefault();
				state.open = true;
			}
		},
	},
} );

function commit() {
	const marketing = state.marketing && ! state.gpc;
	const granted = [
		state.analytics && 'analytics',
		marketing && 'marketing',
	].filter( Boolean );
	document.cookie = `${ COOKIE }=${ encodeURIComponent( granted.join( ',' ) ) }; Max-Age=${ 180 * 86400 }; Path=/; SameSite=Lax${ window.location.protocol === 'https:' ? '; Secure' : '' }`;
	const ads = marketing ? 'granted' : 'denied';
	window.gtag( 'consent', 'update', {
		analytics_storage: state.analytics ? 'granted' : 'denied',
		ad_storage: ads,
		ad_user_data: ads,
		ad_personalization: ads,
	} );
	window.dataLayer.push( {
		event: 'consent_update',
		consent_analytics: state.analytics,
		consent_marketing: marketing,
		gpc: state.gpc,
	} );
	state.open = false;
}
