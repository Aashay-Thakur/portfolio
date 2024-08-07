import { m, useScroll } from 'framer-motion';
import { ReactEventHandler, useContext, useEffect, useState } from 'react';

import { MenuIcon } from '@assets/CustomIcons/MenuToggle';
import { ThemeToggleIcon } from '@assets/CustomIcons/ThemeToggleIcon';
import Logo from '@assets/Logo/Logo';
import { AppBar, Box, IconButton, styled, Toolbar } from '@mui/material';
import { SettingsContext } from '@settings';
import { getIcon } from '@techMap';

interface AppbarProps {
	open: boolean;
	onMenuClick: ReactEventHandler;
	onGeminiChat: ReactEventHandler;
}

const rippleVariants = {
	initial: {
		opacity: 0,
		transform: 'scale(0)',
	},
	animate: {
		opacity: [0.4, 0],
		transform: ['scale(0)', 'scale(4)'],
		transition: {
			delay: 1.5,
			duration: 2,
			ease: 'easeInOut',
			repeat: Infinity,
		},
	},
};

const RippleContainer = styled('div')({
	position: 'absolute',
	top: 0,
	left: 0,
	width: '100%',
	height: '100%',
	overflow: 'hidden',
	pointerEvents: 'none',
});

const RippleEffect = styled(m.div)(({ theme }) => ({
	position: 'absolute',
	borderRadius: '50%',
	backgroundColor: theme.palette.action.active,
	width: 100,
	height: 100,
	opacity: 0,
	transform: 'scale(0)',
}));

const MotionAppBar = m(AppBar);

const Appbar = ({ open, onMenuClick, onGeminiChat }: AppbarProps) => {
	const { disableDarkMode, themeMode, toggleThemeMode } = useContext(SettingsContext);

	const { scrollY } = useScroll();
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	const geminiSvg = getIcon('gemini');

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
						<IconButton color="inherit" aria-label="open drawer" edge="start" onClick={onMenuClick}>
							<MenuIcon open={open} />
						</IconButton>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								flexGrow: 1,
								color: 'white',
								height: '100%',
								ml: 10,
							}}>
							<Logo />
						</Box>
						<IconButton
							sx={{
								'height': 40,
								'width': 40,
								'aspectRatio': '1/1',
								'backgroundColor': 'background.paper',
								'mr': 2,
								'&:hover': {
									backgroundColor: themeMode === 'light' ? '#ddd' : '',
								},
								'overflow': 'hidden',
							}}
							component="button"
							aria-label="talk to Gemini AI"
							onClick={onGeminiChat}
							color="inherit">
							<img height="100%" width="100%" src={geminiSvg.src} alt={geminiSvg.name} />
							<RippleContainer>
								<RippleEffect variants={rippleVariants} initial="initial" animate="animate" />
							</RippleContainer>
						</IconButton>
						{!disableDarkMode && (
							<IconButton
								sx={{
									height: 40,
									width: 40,
									aspectRatio: 1 / 1,
								}}
								component="button"
								aria-label="toggle color mode"
								onClick={() => toggleThemeMode()}
								color="inherit">
								<ThemeToggleIcon mode={themeMode} />
							</IconButton>
						)}
					</Toolbar>
				</MotionAppBar>
			</Box>
		</>
	);
};

export { Appbar };
