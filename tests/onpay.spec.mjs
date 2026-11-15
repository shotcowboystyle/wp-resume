// Checks that the OnPay concept keeps the audit fixes in place, per variant:
// WCAG 2.1 AA (axe), zoom, one <main>, consent defaults and GPC, experiment
// events, lazy stageshow loading and layout stability.
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const VARIANTS = [ 'a', 'b' ]
const dl = ( page ) => page.evaluate( () => JSON.parse( JSON.stringify( window.dataLayer.map( ( e ) => ( e && e.length !== undefined && typeof e !== 'string' ? Array.from( e ) : e ) ) ) ) )

for ( const v of VARIANTS ) {
	test.describe( `variant ${ v }`, () => {
		test( 'has no WCAG 2.1 AA violations', async ( { page } ) => {
			await page.goto( `/?cb_variant=${ v }` )
			const { violations } = await new AxeBuilder( { page } )
				.withTags( [ 'wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa' ] )
				.exclude( '#wpadminbar' )
				.analyze()
			expect( violations.map( ( x ) => `${ x.id }: ${ x.nodes.map( ( n ) => n.target.join( ' ' ) ).slice( 0, 3 ).join( ', ' ) }` ) ).toEqual( [] )
		} )

		test( 'allows zoom and has one main landmark', async ( { page } ) => {
			await page.goto( `/?cb_variant=${ v }` )
			await expect( page.locator( 'meta[name=viewport]' ) ).not.toHaveAttribute( 'content', /user-scalable=no|maximum-scale=1/ )
			await expect( page.locator( 'main' ) ).toHaveCount( 1 )
			await expect( page.locator( 'h1' ) ).toHaveCount( 1 )
		} )

		test( 'renders the forced variant and tags clicks with it', async ( { page } ) => {
			await page.goto( `/?cb_variant=${ v }` )
			const events = await dl( page )
			expect( events.find( ( e ) => e.event === 'experiment_impression' ) ).toMatchObject( { experiment_id: 'onpay-home', experiment_variant: v } )
			await page.evaluate( () => document.addEventListener( 'click', ( e ) => e.preventDefault(), true ) )
			await page.locator( 'main .wp-block-button__link', { hasText: 'Get started' } ).first().click()
			expect( ( await dl( page ) ).find( ( e ) => e.event === 'cta_click' ) ).toMatchObject( { cta_text: 'Get started', experiment_variant: v } )
		} )

		test( 'keeps layout shift under 0.1 while loading and scrolling', async ( { page } ) => {
			await page.addInitScript( () => {
				window.__cls = 0
				new PerformanceObserver( ( l ) => l.getEntries().forEach( ( e ) => { if ( ! e.hadRecentInput ) window.__cls += e.value } ) ).observe( { type: 'layout-shift', buffered: true } )
			} )
			await page.goto( `/?cb_variant=${ v }` )
			for ( let y = 0; y < 6; y++ ) {
				await page.mouse.wheel( 0, 900 )
				await page.waitForTimeout( 400 )
			}
			expect( await page.evaluate( () => window.__cls ) ).toBeLessThan( 0.1 )
		} )
	} )
}

test.describe( 'variant isolation', () => {
	test( 'variant B styles cannot reach variant A', async ( { page } ) => {
		await page.goto( '/?cb_variant=a' )
		await expect( page.locator( '.op-b' ) ).toHaveCount( 0 )
		const selectors = await page.evaluate( () => {
			const sheet = [ ...document.styleSheets ].find( ( s ) => s.href?.includes( 'variant-b.css' ) )
			const out = []
			const walk = ( rules ) => [ ...rules ].forEach( ( r ) => ( r.selectorText ? out.push( r.selectorText ) : r.cssRules && walk( r.cssRules ) ) )
			walk( sheet.cssRules )
			return out
		} )
		expect( selectors.length ).toBeGreaterThan( 0 )
		// Every selector in a list must start at the .op-b root class itself (not .op-b-*).
		const leaks = selectors.flatMap( ( s ) => s.split( ',' ) ).map( ( s ) => s.trim() ).filter( ( s ) => ! /^\.op-b(?![\w-])/.test( s ) )
		expect( leaks ).toEqual( [] )
	} )
} )

test.describe( 'consent', () => {
	test( 'defaults to denied before any tag and sets no analytics cookies', async ( { page } ) => {
		const tagRequests = []
		page.on( 'request', ( r ) => /google-analytics|googletagmanager|doubleclick|hs-scripts|recaptcha/.test( r.url() ) && tagRequests.push( r.url() ) )
		await page.goto( '/?cb_variant=a' )
		const first = ( await dl( page ) )[ 0 ]
		expect( first ).toEqual( [ 'consent', 'default', expect.objectContaining( { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' } ) ] )
		// No banner on arrival: consent stays denied until a choice is made.
		await expect( page.locator( '.cb-consent' ) ).toBeHidden()
		expect( tagRequests ).toEqual( [] )
		expect( ( await page.context().cookies() ).map( ( c ) => c.name ).filter( ( n ) => /^_ga|^_gcl|hubspot/.test( n ) ) ).toEqual( [] )
	} )

	test( 'banner passes axe and Reject keeps everything denied', async ( { page } ) => {
		await page.goto( '/?cb_variant=b' )
		await page.getByRole( 'link', { name: 'Manage Cookies' } ).click()
		const { violations } = await new AxeBuilder( { page } ).include( '.cb-consent' ).withTags( [ 'wcag2a', 'wcag2aa', 'wcag21aa' ] ).analyze()
		expect( violations.map( ( x ) => x.id ) ).toEqual( [] )
		await page.getByRole( 'button', { name: 'Reject all' } ).click()
		const update = ( await dl( page ) ).filter( ( e ) => e[ 1 ] === 'update' ).pop()
		expect( update[ 2 ] ).toMatchObject( { analytics_storage: 'denied', ad_storage: 'denied' } )
		await expect( page.locator( '.cb-consent' ) ).toBeHidden()
	} )

	test( 'Global Privacy Control keeps ad consent denied even after Accept all', async ( { page } ) => {
		await page.addInitScript( () => Object.defineProperty( Navigator.prototype, 'globalPrivacyControl', { get: () => true } ) )
		await page.goto( '/?cb_variant=a' )
		await page.getByRole( 'link', { name: 'Manage Cookies' } ).click()
		await expect( page.getByText( 'Global Privacy Control' ) ).toBeVisible()
		await page.getByRole( 'button', { name: 'Accept all' } ).click()
		const update = ( await dl( page ) ).filter( ( e ) => e[ 1 ] === 'update' ).pop()
		expect( update[ 2 ] ).toMatchObject( { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' } )
		// The stored choice is re-applied before tags on the next page.
		await page.reload()
		const replay = ( await dl( page ) ).filter( ( e ) => e[ 1 ] === 'update' )[ 0 ]
		expect( replay[ 2 ] ).toMatchObject( { analytics_storage: 'granted', ad_storage: 'denied' } )
	} )

	test( 'Manage Cookies opens the choices', async ( { page } ) => {
		await page.goto( '/?cb_variant=a' )
		await page.getByRole( 'link', { name: 'Manage Cookies' } ).click()
		await expect( page.getByRole( 'region', { name: 'Your cookie choices' } ) ).toBeVisible()
	} )
} )

test.describe( 'stageshow scenes', () => {
	test( 'load only near the viewport and replace the poster', async ( { page } ) => {
		const loads = []
		page.on( 'request', ( r ) => r.url().includes( 'stageshow.js' ) && loads.push( r.url() ) )
		await page.goto( '/?cb_variant=b' )
		const hero = page.locator( '[data-stageshow="onpay-expert"]' )
		await expect( hero ).toHaveAttribute( 'data-mounted', 'live', { timeout: 15_000 } )
		expect( loads ).toHaveLength( 1 )
		await expect( page.locator( '[data-stageshow="onpay-dashboard"]' ) ).not.toHaveAttribute( 'data-mounted', /./ )
	} )

	test( 'never load under reduced motion; the poster stays', async ( { browser } ) => {
		const page = await browser.newPage( { reducedMotion: 'reduce' } )
		const loads = []
		page.on( 'request', ( r ) => r.url().includes( 'stageshow.js' ) && loads.push( r.url() ) )
		await page.goto( '/?cb_variant=b' )
		await page.waitForTimeout( 1500 )
		expect( loads ).toEqual( [] )
		await expect( page.locator( '.wp-block-cb-stage__poster--wide' ).first() ).toBeVisible()
		await page.close()
	} )
} )
