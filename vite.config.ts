import { defineConfig } from 'vite';
import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: './public/build/',
		emptyOutDir: false,
		copyPublicDir: false,
		lib: {
			entry: './src/main.ts',
			name: 'ViteProject',
			fileName: 'vite.project',
			formats: ['iife']
		},
		rollupOptions: {
			output: {
				assetFileNames: () => 'vite.project[extname]'
			}
		}
	},
	plugins: [
		svelte({
			preprocess: vitePreprocess(),
			compilerOptions: {
				// Kebabcase classnames
				cssHash: ({name}) => 'vite-'+name.split('').map((letter, idx) =>
					letter.toUpperCase() === letter ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}` : letter
				).join('')
			}
		})
	]
});
