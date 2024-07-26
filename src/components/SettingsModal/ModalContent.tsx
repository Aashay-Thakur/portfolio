import { ReactNode, useContext } from 'react';

import { Box, FormControl, Grid, GridProps, InputLabel, MenuItem, Select, Switch, Typography } from '@mui/material';
import { SettingsContext } from '@settings';
import { ColorBlindMode } from '@types';

interface RowProps extends GridProps {
	title: string;
	description: string;
	action: ReactNode;
}

const Row = (props: RowProps) => {
	const { title, description, action, ...rest } = props;

	return (
		<Grid item {...rest}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'space-between',
					padding: 2,
				}}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						gap: 1,
					}}>
					<Typography variant="body1">{title}</Typography>
					{action}
				</Box>
				<Typography color="text.secondary" variant="body2">
					{description}
				</Typography>
			</Box>
		</Grid>
	);
};

const ModalContent = () => {
	const {
		disableAnimations,
		toggleDisableAnimations,
		disableDarkMode,
		toggleDisableDarkMode,
		colorBlindMode,
		setColorBlindMode,
		enableDyslexicFont,
		toggleDyslexicFont,
		enableBoldText,
		toggleBoldText,
		disableMorphism,
		toggleMorphism,
	} = useContext(SettingsContext);

	return (
		<Grid container spacing={2}>
			<Row
				xs={12}
				md={6}
				title="Disable Animations"
				description="Disable all animation and transitions. This can help reduce motion sickness."
				action={<Switch checked={disableAnimations} onChange={toggleDisableAnimations} />}
			/>
			<Row
				xs={12}
				md={6}
				title="Disable Dark Mode"
				description="Disable all dark mode features. This can help reduce eye strain."
				action={<Switch checked={disableDarkMode} onChange={toggleDisableDarkMode} />}
			/>
			<Row
				xs={12}
				md={6}
				title="Enable Dyslexic Mode"
				description="Switches to a font that is easier to read for people with dyslexia."
				action={<Switch checked={enableDyslexicFont} onChange={toggleDyslexicFont} />}
			/>
			<Row
				xs={12}
				md={6}
				title="Bold Text"
				description="Turns all text bold."
				action={<Switch checked={enableBoldText} onChange={toggleBoldText} />}
			/>
			<Row
				md={12}
				title="Set Color Blind Mode"
				description=""
				action={
					<FormControl fullWidth>
						<InputLabel id="color-blind-mode-label">Mode</InputLabel>
						<Select
							labelId="color-blind-mode-label"
							id="color-blind-mode-select"
							value={colorBlindMode}
							label="Mode"
							onChange={(e) => {
								setColorBlindMode(e.target.value as ColorBlindMode);
							}}>
							<MenuItem value="none">None</MenuItem>
							<MenuItem value="protanopia">Red</MenuItem>
							<MenuItem value="deuteranopia">Green</MenuItem>
							<MenuItem value="tritanopia">Blue</MenuItem>
							<MenuItem value="achromatopsia">Grayscale</MenuItem>
						</Select>
					</FormControl>
				}
			/>
			<Row
				md={12}
				title="Disanle Glassmorphism Effect"
				description="Disable all the blur effects on cards. Helps with motion sickness."
				action={<Switch checked={disableMorphism} onChange={toggleMorphism} />}
			/>
		</Grid>
	);
};

export { ModalContent };
