import React from 'react';
import Wavify from 'react-wavify';

import { Box, BoxProps } from '@mui/material';

interface WaveProps extends BoxProps {
	fill?: string;
	fillOpacity?: number;
	paused?: boolean;
	waveHeight?: number;
	amplitude?: number;
	speed?: number;
	points?: number;
}

const WaveBox: React.FC<WaveProps> = ({
	fill = '#1277b0',
	fillOpacity = 1,
	paused = false,
	waveHeight = 20,
	amplitude = 40,
	speed = 0.15,
	points = 3,
	...boxProps
}) => {
	const waveProps = {
		fill,
		fillOpacity,
		paused,
		options: {
			height: waveHeight,
			amplitude,
			speed,
			points,
		},
	};
	return (
		<Box {...boxProps}>
			<Wavify {...waveProps} />
		</Box>
	);
};

export { WaveBox };
