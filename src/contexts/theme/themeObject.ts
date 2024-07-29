import { CSSProperties } from 'react';

import {
    alpha, CSSObject, Interpolation, PaletteMode, PaletteOptions, ThemeOptions
} from '@mui/material';

const appBarHeight = 64;

const paletteOptions: Record<PaletteMode, PaletteOptions> = {
	light: {
		text: {
			primary: 'hsl(0, 0%, 20%)',
			secondary: 'hsl(0, 0%, 60%)',
			disabled: 'hsl(0, 5%, 22%)',
		},
		primary: {
			main: 'hsl(211, 100%, 50%)',
		},
		secondary: {
			main: 'hsl(291, 64%, 42%)',
		},
		background: {
			default: 'hsl(0, 0%, 100%)',
			paper: 'hsl(210, 17%, 98%)',
		},
		divider: 'hsl(211, 100%, 50%)',
		info: {
			main: 'hsl(211, 100%, 50%)',
		},
	},
	dark: {
		text: {
			primary: 'hsl(0, 0%, 94%)',
			secondary: 'hsl(0, 0%, 91%)',
			disabled: 'hsl(0, 0%, 33%)',
		},
		background: {
			default: 'hsl(0, 0%, 12%)',
			paper: 'hsl(0, 0%, 16%)',
		},
		divider: 'hsl(0, 0%, 23%)',
		info: {
			main: 'hsl(0, 0%, 94%)',
		},
	},
};

export function getTheme(mode: PaletteMode, disableMorphismSetting: boolean): ThemeOptions {
	return {
		palette: { ...paletteOptions[mode], mode },
		components: {
			MuiTypography: {
				defaultProps: {
					variantMapping: {
						h1: 'h1',
						h2: 'h2',
						h3: 'h3',
						h4: 'h4',
						h5: 'h5',
						h6: 'h6',
					},
				},
			},
		},
		mixins: {
			toolbar: {
				height: appBarHeight,
			},
			customScrollbar: {
				'&::-webkit-scrollbar': { width: '6px !important', height: '6px !important' },
				'&::-webkit-scrollbar-track': { backgroundColor: 'var(--mui-palette-background-paper) !important' },
				'&::-webkit-scrollbar-thumb': { backgroundColor: 'var(--mui-palette-divider) !important' },
			},
			glassMorphism: (
				theme,
				{
					noBorder = true,
					noBoxShadow = true,
					gradientBackground = true,
					disableMorphism = disableMorphismSetting,
				} = {},
			): CSSObject => {
				const props: Interpolation<CSSProperties> = {
					position: 'relative',
					overflow: 'hidden',
					backdropFilter: disableMorphism ? 'none' : 'blur(10px)',
					border: noBorder ? 'none' : '1px solid #ffffff4d',
					boxShadow: noBoxShadow ? 'none' : '0 4px 6px #0000001a',
				};

				if (gradientBackground) {
					props['&::before'] = {
						content: '""',
						background: theme.mixins.linearGradient(theme, { opacity: disableMorphism ? 1 : 0.6 }),
						height: '100%',
						width: '100%',
						display: 'block',
						position: 'absolute',
						zIndex: -1,
						left: 0,
						top: 0,
					};
					props.color = 'hsl(0, 0%, 100%)';
				}

				return props;
			},
			linearGradient: (theme, props = {}): string => {
				const {
					primary = theme.palette.primary.main,
					secondary = theme.palette.secondary.main,
					opacity = 1,
					direction = '45deg',
				} = props;

				const primaryWithAlpha = alpha(primary, opacity);
				const secondaryWithAlpha = alpha(secondary, opacity);

				return `linear-gradient(${direction}, ${primaryWithAlpha}, ${secondaryWithAlpha})`;
			},
			gradientAnimation: (gradient: string) => {
				return {
					'background': gradient,
					'animation': 'gradient 10s infinite',
					'backgroundSize': '200%',
					'@keyframes gradient': {
						'0%': { backgroundPosition: 'left' },
						'50%': { backgroundPosition: 'right' },
						'100%': { backgroundPosition: 'left' },
					},
				};
			},
		},
		appBarHeight: appBarHeight,
	};
}
