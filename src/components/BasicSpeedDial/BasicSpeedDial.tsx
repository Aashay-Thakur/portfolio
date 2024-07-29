import { useContext } from 'react';

import {
    ArrowDownwardSharp, ArrowUpwardSharp, ContrastSharp, SettingsSharp
} from '@mui/icons-material';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import { SettingsContext } from '@settings';

function BasicSpeedDial({ settingsModalOnOpen }: { settingsModalOnOpen: () => void }) {
	const { disableAnimations, disableDarkMode, themeMode, toggleThemeMode } = useContext(SettingsContext);

	function scrollDown() {
		window.scrollTo({ top: document.body.scrollHeight, behavior: disableAnimations ? 'auto' : 'smooth' });
	}

	function scrollUp() {
		window.scrollTo({ top: 0, behavior: disableAnimations ? 'auto' : 'smooth' });
	}

	function openAccessibilitySettings() {
		settingsModalOnOpen();
	}

	var actions = [
		{
			icon: <SettingsSharp color="action" />,
			name: 'Open Accessibility Settings',
			event: openAccessibilitySettings,
			key: 'settings',
		},
		{
			icon: <ContrastSharp color="action" />,
			name: `Switch to ${themeMode === 'dark' ? 'Light' : 'Dark'} Mode`,
			event: toggleThemeMode,
			key: 'colorMode',
		},
		{
			icon: <ArrowDownwardSharp color="action" />,
			name: 'Scroll Down',
			event: scrollDown,
			key: 'scrollDown',
		},
		{
			icon: <ArrowUpwardSharp color="action" />,
			name: 'Scroll Up',
			event: scrollUp,
			key: 'scrollUp',
		},
	];

	if (disableDarkMode) {
		actions = actions.filter((action) => action.key !== 'colorMode');
	}

	return (
		<Box>
			<SpeedDial
				ariaLabel="SpeedDial"
				sx={{ position: 'fixed', bottom: 16, right: 16 }}
				icon={<SpeedDialIcon />}
				FabProps={{
					sx(theme) {
						return {
							...theme.mixins.gradientAnimation(theme.mixins.linearGradient(theme)),
						};
					},
				}}>
				{actions.map((action) => (
					<SpeedDialAction
						key={action.key}
						icon={action.icon}
						tooltipTitle={action.name}
						onClick={() => action.event()}
					/>
				))}
			</SpeedDial>
		</Box>
	);
}

export { BasicSpeedDial };
