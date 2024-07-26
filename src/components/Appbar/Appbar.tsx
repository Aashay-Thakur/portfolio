import { motion, useScroll } from 'framer-motion';
import { useContext, useEffect, useRef, useState } from 'react';

import { MenuIcon } from '@assets/MenuToggle/MenuToggle';
import { CustomIcon } from '@barrel';
import { alpha, AppBar, Box, Hidden, IconButton, InputAdornment, InputBase, styled, Toolbar } from '@mui/material';
import { SettingsContext } from '@settings';

const MotionAppBar = motion(AppBar);

const Search = styled('div')(({ theme }) => ({
	'position': 'relative',
	'borderRadius': theme.shape.borderRadius,
	'backgroundColor': alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	'marginLeft': 0,
	'width': '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	'color': 'inherit',
	'width': '100%',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		[theme.breakpoints.up('sm')]: {
			'width': '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));

const Appbar = ({ open, onMenuClick }: { open: boolean; onMenuClick: Function }) => {
	const { disableDarkMode, themeMode, toggleThemeMode } = useContext(SettingsContext);
	const searchInput = useRef<HTMLInputElement>(null);

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

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const input = searchInput?.current?.querySelector('input');
			if (event.ctrlKey && event.key === 'k') {
				event.preventDefault();
				input?.focus();
			}
			if (event.key === 'Escape' && input === document.activeElement) {
				event.preventDefault();
				input?.blur();
			}
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

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
						<div style={{ flexGrow: 1 }}></div>
						{!disableDarkMode && (
							<IconButton
								component="button"
								sx={{ ml: 1, mr: 2 }}
								aria-label="toggle color mode"
								onClick={() => toggleThemeMode()}
								color="inherit">
								<CustomIcon icon={themeMode === 'dark' ? ['fas', 'sun'] : ['fas', 'moon']} />
							</IconButton>
						)}
						<Search>
							<SearchIconWrapper>
								<CustomIcon icon={['fas', 'search']} />
							</SearchIconWrapper>
							<StyledInputBase
								placeholder="Search…"
								inputProps={{ 'aria-label': 'search' }}
								ref={searchInput}
								endAdornment={
									<Hidden smDown>
										<InputAdornment position="end">
											<Box
												sx={{
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'center',
													borderRadius: 1,
													fontSize: 10,
													border: '1px solid',
													paddingX: 0.5,
													marginRight: 0.5,
													color: 'white',
												}}>
												Ctrl+K
											</Box>
										</InputAdornment>
									</Hidden>
								}
							/>
						</Search>
					</Toolbar>
				</MotionAppBar>
			</Box>
		</>
	);
};

export { Appbar };
