import { AnimatePresence, m } from 'framer-motion';
import { ReactNode, useContext, useEffect, useState } from 'react';

import SvgFilters from '@assets/SvgFilter';
import { Box, createTheme, GlobalStyles, ThemeProvider } from '@mui/material';
import { Interpolation, Theme as ThemeType } from '@mui/material/styles';
import { SettingsContext } from '@settings';
import { ColorBlindMode } from '@types';
import { getCssVarsFromObject } from '@utils/helper';

import { getTheme } from './themeObject';

const MotionBox = m(Box);

const colorBlindFilterMap: Record<ColorBlindMode, string> = {
	achromatopsia: 'grayscale(100%)',
	none: 'none',
	protanopia: 'url(#protanopia-filter)',
	deuteranopia: 'url(#deuteranopia-filter)',
	tritanopia: 'url(#tritanopia-filter)',
};

function Theme({ children }: { children: ReactNode }) {
	const [isToggling, setIsToggling] = useState(false);
	const { disableAnimations, enableDyslexicFont, enableBoldText, themeMode, disableMorphism, colorBlindMode } =
		useContext(SettingsContext);

	const themeObject = getTheme(themeMode, disableMorphism);
	const theme = createTheme(themeObject);

	useEffect(() => {
		setIsToggling(true);
		const timeout = setTimeout(() => setIsToggling(false), 500);
		return () => clearTimeout(timeout);
	}, [themeMode]);

	function getGlobalStyles(): Interpolation<ThemeType> {
		const cssVars = getCssVarsFromObject({
			object: theme,
			include: ['palette'],
			exclude: ['grey'],
			type: 'hex',
		});

		return {
			'*': {
				fontFamily: enableDyslexicFont ? 'OpenDyslexic !important' : 'Lato !important',
			},
			'*, *::before, *::after': {
				transition: disableAnimations ? 'none !important' : 'background 0.3s ease-out',
				animation: disableAnimations ? 'none !important' : undefined,
				scrollbarBehavior: disableAnimations ? 'snap !important' : 'smooth !important',
				fontWeight: enableBoldText ? '1000 !important' : undefined,
			},
			':root': cssVars,
			'body': !disableAnimations
				? {
						transitionDelay: '0.3s !important',
						transitionProperty: 'background-color !important',
						backgroundColor: 'var(--mui-palette-background-default)',
				  }
				: {},
			'html': {
				filter: colorBlindFilterMap[colorBlindMode],
			},
		};
	}

	return (
		<ThemeProvider theme={theme}>
			<SvgFilters />
			<GlobalStyles styles={() => getGlobalStyles()} />
			<AnimatePresence>
				{isToggling && (
					<MotionBox
						initial={{ scale: 0 }}
						animate={!disableAnimations && { scale: 6 }}
						exit={{ scale: 0 }}
						transition={{ duration: 0.3, ease: 'linear' }}
						sx={{
							position: 'fixed',
							right: '-50vh',
							bottom: '-50vh',
							height: '100vh',
							aspectRatio: 1,
							backgroundColor: theme.palette.background.default,
							borderRadius: '50%',
							zIndex: -999,
						}}
					/>
				)}
			</AnimatePresence>
			{children}
		</ThemeProvider>
	);
}

export { Theme };
