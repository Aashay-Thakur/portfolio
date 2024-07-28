import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		target: 'ESNext',
		sourcemap: true,
	},
	resolve: {
		alias: {
			'@barrel': '/src/components/barrel.ts',
			'@data': '/src/contexts/data/data.ts',
			'@theme': '/src/contexts/theme/Theme.tsx',
			'@types': '/src/types/types.d.ts',
			'@assets': '/src/assets',
			'@settings': '/src/contexts/settings/Settings.tsx',
			'@utils': '/src/utils',
			'@techMap': '/src/contexts/data/techMap.tsx',
			'@root': '/src/',
		},
	},
	mode: 'production',
});
