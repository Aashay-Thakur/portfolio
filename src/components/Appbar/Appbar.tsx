import { motion, useScroll } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';

import Logo from '@assets/Logo/Logo';
import { MenuIcon } from '@assets/MenuToggle/MenuToggle';
import { CustomIcon } from '@barrel';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import { SettingsContext } from '@settings';

const MotionAppBar = motion(AppBar);

const Appbar = ({ open, onMenuClick }: { open: boolean; onMenuClick: Function }) => {
	const { disableDarkMode, themeMode, toggleThemeMode } = useContext(SettingsContext);

	const { scrollY } = useScroll();
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		const unsubscribe = scrollY.on('change', (latest) => {
			if (latest > lastScrollY && latest > 100) {
				setIsVisible(false);
			} else {
				setIsVisible(true);
			}
			setLastScrollY(latest);
		});

		return () => unsubscribe();
	}, [lastScrollY, scrollY]);

	return (
		<>
			<Box className="appbar-container">
				<MotionAppBar
					initial={{ y: 0 }}
					animate={{ y: isVisible ? 0 : -64 }}
					transition={{ ease: 'easeOut', duration: 0.3 }}
					sx={{
						flexGrow: 1,
						position: 'fixed',
						top: 0,
						width: '100%',
						zIndex: 10000,
					}}>
					<Toolbar>
						<IconButton color="inherit" aria-label="open drawer" edge="start" onClick={() => onMenuClick()}>
							<MenuIcon open={open} />
						</IconButton>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								flexGrow: 1,
								color: 'white',
							}}>
							<Logo />
						</Box>
						{!disableDarkMode && (
							<IconButton
								component="button"
								aria-label="toggle color mode"
								onClick={() => toggleThemeMode()}
								color="inherit">
								<CustomIcon icon={themeMode === 'dark' ? ['fas', 'sun'] : ['fas', 'moon']} />
							</IconButton>
						)}
					</Toolbar>
				</MotionAppBar>
			</Box>
		</>
	);
};

export { Appbar };
