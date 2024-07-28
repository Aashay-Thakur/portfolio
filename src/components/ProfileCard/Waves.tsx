import { WaveBox } from '@assets/Wave/WaveBox';
import { WaveLines } from '@assets/Wave/WaveLines';
import { useMediaQuery, useTheme } from '@mui/material';

const Waves = ({ type, disableAnimations }: { type: 'fluid' | 'line'; disableAnimations: boolean }) => {
	const theme = useTheme();
	const isXs = useMediaQuery(theme.breakpoints.down('sm'));

	const defaultWaveProps = {
		points: isXs ? 2 : 5,
		fillOpacity: 0.5,
		paused: disableAnimations,
		sx: {
			position: 'absolute' as 'absolute',
			width: '100%',
		},
	};

	if (type === 'line') {
		return (
			<>
				<WaveLines
					id="pattern1"
					strokeColor={theme.palette.primary.main}
					rotation={45}
					speed={0.15}
					amplitude={60}
					strokeWidth={8}
					{...defaultWaveProps}
				/>
				<WaveLines
					id="pattern2"
					strokeColor={theme.palette.secondary.main}
					rotation={-45}
					speed={0.1}
					amplitude={70}
					strokeWidth={8}
					{...defaultWaveProps}
				/>
			</>
		);
	}

	if (type === 'fluid') {
		return (
			<>
				<WaveBox
					id="pattern1"
					fill={theme.palette.primary.main}
					speed={0.15}
					amplitude={60}
					{...defaultWaveProps}
				/>
				<WaveBox
					id="pattern2"
					fill={theme.palette.secondary.main}
					speed={0.1}
					amplitude={70}
					{...defaultWaveProps}
				/>
			</>
		);
	}
};

export { Waves };
