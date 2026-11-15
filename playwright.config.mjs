// Runs against the OnPay concept in WordPress Playground (pnpm serve:onpay),
// served by portless at a fixed HTTPS URL. Run `mise run setup` once first.
import { defineConfig } from '@playwright/test'

const baseURL = 'https://onpay.wp-resume.localhost'

export default defineConfig({
	testDir: 'tests',
	timeout: 90_000,
	workers: 2,
	use: { baseURL, channel: 'chrome' },
	webServer: {
		command: 'pnpm serve:onpay',
		// A static file: Playground's auto-login 302s every PHP route back to itself,
		// and the readiness probe would follow that loop forever.
		url: `${ baseURL }/wp-includes/css/dashicons.min.css`,
		// The probe runs in Node, which doesn't read the system trust store.
		ignoreHTTPSErrors: true,
		reuseExistingServer: true,
		timeout: 300_000,
	},
})
