/* React */
import { useContext } from 'react';

/* FontAwesome */
import { CustomIcon } from '@barrel';
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
/* MUI */
import { SpeedDial, SpeedDialAction, SpeedDialIcon, styled } from '@mui/material';
/* Types */
import { SettingsContext } from '@settings';

const StyledIcon = styled((props: FontAwesomeIconProps) => {
	return <CustomIcon {...props} />;
})(({ theme }) => ({
	color: theme.palette.text.primary,
}));

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
			icon: <StyledIcon icon={['fas', 'gear']} />,
			name: 'Open Accessibility Settings',
			event: openAccessibilitySettings,
			key: 'settings',
		},
		{
			icon: <StyledIcon icon={['fas', 'adjust']} />,
			name: `Switch to ${themeMode === 'dark' ? 'Light' : 'Dark'} Mode`,
			event: toggleThemeMode,
			key: 'colorMode',
		},
		{
			icon: <StyledIcon icon={['fas', 'arrow-down']} />,
			name: 'Scroll Down',
			event: scrollDown,
			key: 'scrollDown',
		},
		{
			icon: <StyledIcon icon={['fas', 'arrow-up']} />,
			name: 'Scroll Up',
			event: scrollUp,
			key: 'scrollUp',
		},
	];

	if (disableDarkMode) {
		actions = actions.filter((action) => action.key !== 'colorMode');
	}

	return (
		<SpeedDial ariaLabel="SpeedDial" sx={{ position: 'fixed', bottom: 16, right: 16 }} icon={<SpeedDialIcon />}>
			{actions.map((action) => (
				<SpeedDialAction
					key={action.key}
					icon={action.icon}
					tooltipTitle={action.name}
					onClick={() => action.event()}
				/>
			))}
		</SpeedDial>
	);
}

export { BasicSpeedDial };
