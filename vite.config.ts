import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		target: 'ESNext',
		sourcemap: true,
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return id.toString().split('node_modules/')[1].split('/')[0].toString();
					}
				},
			},
		},
	},
	resolve: {
		alias: {
			'@barrel': '/src/components/barrel.ts',
			'@theme': '/src/contexts/theme/Theme.tsx',
			'@types': '/src/types/types.d.ts',
			'@assets': '/src/assets',
			'@settings': '/src/contexts/settings/Settings.tsx',
			'@utils': '/src/utils',
			'@techMap': '/src/contexts/data/techMap.tsx',
			'@root': '/src/',
			'@hooks': '/src/hooks',
		},
	},
	mode: 'production',
});
