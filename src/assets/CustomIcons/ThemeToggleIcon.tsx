import { AnimatePresence, m } from 'framer-motion';

import { DarkModeSharp, LightModeSharp } from '@mui/icons-material';
import { PaletteMode } from '@mui/material';

interface ThemeToggleIconProps {
	mode: PaletteMode;
}

const variants = {
	enter: { scale: 0 },
	middle: { scale: 1 },
	exit: { scale: 0 },
};

const ThemeToggleIcon = ({ mode }: ThemeToggleIconProps) => {
	return (
		<AnimatePresence mode="wait">
			<m.div
				key={mode}
				initial="enter"
				animate="middle"
				exit="exit"
				variants={variants}
				transition={{ duration: 0.1, type: 'spring' }}>
				{mode === 'dark' ? <LightModeSharp /> : <DarkModeSharp />}
			</m.div>
		</AnimatePresence>
	);
};

export { ThemeToggleIcon };
