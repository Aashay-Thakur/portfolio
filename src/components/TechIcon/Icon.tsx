import { motion } from 'framer-motion';
import { forwardRef, useContext, useState } from 'react';

import { Box, Stack, styled, SxProps, Typography } from '@mui/material';
import { SettingsContext } from '@settings';
import { SkillDetails } from '@types';

interface IconProps {
	icon: SkillDetails;
	label: string;
	sx?: SxProps;
}

const blackIcons = ['ExpressJS', 'Markdown'];

const MotionBox = motion(Box);
const StyledImage = styled('img')(({ alt, theme }) => {
	if (theme.palette.mode === 'dark' && alt && blackIcons.includes(alt)) {
		return {
			backgroundColor: 'white',
			padding: 1,
			borderRadius: 1,
		};
	} else return {};
});

const Icon = forwardRef((props: IconProps, ref) => {
	const { icon, label, sx } = props;
	const [hovering, setHovering] = useState<boolean>(false);
	const { disableAnimations } = useContext(SettingsContext);

	return (
		<Stack
			ref={ref as any}
			spacing={5}
			sx={{ height: '100%', width: '100%', display: 'grid', placeItems: 'center', cursor: 'pointer', ...sx }}
			onMouseEnter={() => setHovering(!disableAnimations && true)}
			onMouseLeave={() => setHovering(false)}>
			<MotionBox
				sx={{ height: 50, width: 50, display: 'grid', placeItems: 'center' }}
				animate={{ scale: hovering ? 1.1 : 1, y: hovering ? -10 : 0 }}>
				<StyledImage src={icon.icon} alt={icon.name} width="100%" height="100%" />
			</MotionBox>
			<Typography
				sx={{
					display: 'grid',
					placeItems: 'center',
					width: 'min-content',
					height: '100%',
					textAlign: 'center',
				}}
				variant="body2">
				{label}
			</Typography>
		</Stack>
	);
});

export { Icon };
