// Runs against the OnPay concept in WordPress Playground (pnpm serve:onpay).
import { defineConfig } from '@playwright/test'

export default defineConfig({
	testDir: 'tests',
	timeout: 90_000,
	workers: 2,
	use: { baseURL: 'http://127.0.0.1:9401', channel: 'chrome' },
	webServer: {
		command: 'pnpm serve:onpay',
		url: 'http://127.0.0.1:9401',
		reuseExistingServer: true,
		timeout: 300_000,
	},
})
