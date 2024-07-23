import { easeInOut, motion } from 'framer-motion';

import { useTheme } from '@mui/material';

interface MotionArrowProps {
	delay?: number;
	strokeWidth?: number;
	duration?: number;
	color?: string;
	repeat?: boolean;
	rotation?: number;
	repeatDelay?: number;
	arrowTip?: boolean;
	still?: boolean;
}

const MotionArrow = ({
	delay = 0,
	color,
	strokeWidth = 1,
	duration = 2,
	repeat = true,
	rotation = 0,
	repeatDelay = 0,
	arrowTip = false,
	still = false,
}: MotionArrowProps) => {
	const d = arrowTip ? 'M 0 50 L 100 50 L 95 45' : 'M 0 50 L 100 50';
	const theme = useTheme();

	if (still) {
		return (
			<motion.svg
				width="100%"
				height="100%"
				viewBox="0 0 100 100"
				preserveAspectRatio="none"
				style={{ transform: `rotate(${rotation}deg)` }}>
				<path
					d={d}
					fill="transparent"
					stroke={color || theme.palette.secondary.main}
					strokeWidth={strokeWidth}
				/>
				<motion.path
					d={d}
					fill="transparent"
					stroke={theme.palette.background.default}
					strokeWidth={strokeWidth * 2}
					strokeDasharray="5,5" // Adjust the dash pattern as needed
					strokeDashoffset="0"
					animate={{ strokeDashoffset: -10 }} // Adjust the offset value as needed
					transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
				/>
			</motion.svg>
		);
	}

	return (
		<motion.svg
			width="100%"
			height="100%"
			viewBox="0 0 100 100"
			preserveAspectRatio="none"
			style={{ transform: `rotate(${rotation}deg)` }}>
			<motion.path
				d={d}
				fill="transparent"
				stroke={color || theme.palette.secondary.main}
				strokeWidth={strokeWidth}
				initial={{ pathLength: 0, pathOffset: 0 }}
				animate={{ pathLength: [0, 1], pathOffset: [0, 1] }}
				transition={{
					duration,
					delay,
					ease: easeInOut,
					repeat: repeat ? Infinity : 0,
					repeatType: 'loop',
					repeatDelay,
				}}
			/>
		</motion.svg>
	);
};

export { MotionArrow };
