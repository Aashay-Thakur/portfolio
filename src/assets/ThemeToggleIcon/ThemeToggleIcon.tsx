import { DarkModeSharp, LightModeSharp } from '@mui/icons-material';
import { PaletteMode } from '@mui/material';

interface ThemeToggleIconProps {
	mode: PaletteMode;
}

const ThemeToggleIcon = ({ mode }: ThemeToggleIconProps) => {
	return mode === 'dark' ? <LightModeSharp /> : <DarkModeSharp />;
};

export { ThemeToggleIcon };
