import { CSSProperties } from 'react';

import { Theme as ThemeType } from '@mui/material';
import { GlassMorphismProps, LinearGradientProps } from '@types';

/* Theme Types */
declare module '@mui/material/styles' {
	interface Theme {
		appBarHeight: number;
	}
	interface ThemeOptions {
		appBarHeight?: number;
	}
	interface Mixins {
		customScrollbar: {
			[key: `&::-webkit-scrollbar${string}`]: CSSProperties;
		};
		glassMorphism: (theme: ThemeType, props?: GlassMorphismProps) => CSSObject;
		linearGradient: (theme: ThemeType, props?: LinearGradientProps) => string;
		gradientAnimation: (gradient: string) => CSSProperties;
	}
}
