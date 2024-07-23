import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useContext, useEffect, useState } from 'react';

import { Box, createTheme, GlobalStyles, ThemeProvider } from '@mui/material';
import { Interpolation, Theme as ThemeType } from '@mui/material/styles';
import { SettingsContext } from '@settings';
import { getCssVarsFromObject } from '@utils/helper';

import { getTheme } from './themeObject';

const MotionBox = motion(Box);

function Theme({ children }: { children: ReactNode }) {
	const [isToggling, setIsToggling] = useState(false);
	const { disableAnimations, enableDyslexicFont, enableBoldText, themeMode, disableMorphism } =
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
			object: themeObject,
			exclude: ['components', 'appBarHeight'],
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
		};
	}

	return (
		<ThemeProvider theme={theme}>
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
