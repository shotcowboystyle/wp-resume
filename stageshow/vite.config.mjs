// Builds the OnPay scenes into one ES module + one stylesheet for the
// cb/stage block: plugin/cb-resume-blocks/assets/stageshow/stageshow.{js,css}.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const here = (p) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
  plugins: [react()],
  // preact/compat stands in for React: same kit, about a third of the runtime.
  resolve: { alias: { react: 'preact/compat', 'react-dom/client': 'preact/compat/client', 'react-dom': 'preact/compat', 'react/jsx-runtime': 'preact/jsx-runtime' } },
  define: { 'process.env.NODE_ENV': '"production"' },
  build: {
    target: 'es2022',
    outDir: here('../plugin/cb-resume-blocks/assets/stageshow'),
    emptyOutDir: true,
    assetsInlineLimit: 0,
    minify: 'esbuild',
    // Only stylesheets have side effects, so unused kit parts (and their brand
    // artwork) drop out of the bundle.
    rollupOptions: { treeshake: { moduleSideEffects: (id) => /\.css$/.test(id) } },
    lib: { entry: here('src/embed.tsx'), formats: ['es'], fileName: () => 'stageshow.js', cssFileName: 'stageshow' },
  },
})
