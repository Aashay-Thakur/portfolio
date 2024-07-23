import { useContext, useEffect, useRef } from 'react';

import { MenuIcon } from '@assets/MenuToggle/MenuToggle';
import { CustomIcon } from '@barrel';
import {
    AppBar, Box, IconButton, InputAdornment, InputBase, Toolbar, Typography
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { SettingsContext } from '@settings';

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
		// vertical padding + font size from searchIcon
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
				<AppBar sx={{ flexGrow: 1, position: 'fixed', top: 0, width: '100%', zIndex: 10000 }}>
					<Toolbar>
						<IconButton color="inherit" aria-label="open drawer" edge="start" onClick={() => onMenuClick()}>
							{/* <CustomIcon icon={['fas', 'bars']} /> */}
							<MenuIcon open={open} />
						</IconButton>
						<Typography
							variant="h6"
							noWrap
							component="div"
							sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, ml: { xs: 5 } }}
							textTransform="uppercase">
							Resume
						</Typography>
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
								}
							/>
						</Search>
					</Toolbar>
				</AppBar>
			</Box>
		</>
	);
};

export { Appbar };
