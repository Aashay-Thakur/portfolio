import React from 'react';
import Wavify from 'react-wavify';

import { Box, BoxProps } from '@mui/material';

interface WaveProps extends BoxProps {
	id: string;
	fillOpacity?: number;
	paused?: boolean;
	waveHeight?: number;
	amplitude?: number;
	speed?: number;
	points?: number;
	strokeColor?: string;
	rotation?: number;
	strokeWidth?: number;
}

const WaveLines: React.FC<WaveProps> = ({
	id,
	fillOpacity = 1,
	paused = false,
	waveHeight = 20,
	amplitude = 40,
	speed = 0.15,
	points = 3,
	strokeColor = '#1277b0',
	rotation = 45,
	strokeWidth = 2,
	...boxProps
}) => {
	const waveProps = {
		fill: `url(#${id})`,
		fillOpacity,
		paused,
		options: { height: waveHeight, amplitude, speed, points },
	};

	return (
		<Box {...boxProps}>
			<svg width="0" height="0">
				<defs>
					<pattern
						id={id}
						patternUnits="userSpaceOnUse"
						width="10"
						height="10"
						patternTransform={`rotate(${rotation})`}>
						<line x1="0" y1="0" x2="0" y2="10" stroke={strokeColor} strokeWidth={strokeWidth} />
					</pattern>
				</defs>
			</svg>
			<Wavify {...waveProps} />
		</Box>
	);
};

export { WaveLines };
