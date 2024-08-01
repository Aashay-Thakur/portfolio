import { m } from 'framer-motion';
import { forwardRef, useContext, useState } from 'react';

import { Box, Stack, SxProps, Typography } from '@mui/material';
import { SettingsContext } from '@settings';
import { SkillDetails } from '@types';

interface IconProps {
	icon: SkillDetails;
	label: string;
	sx?: SxProps;
}

const MotionBox = m(Box);

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
				<img src={icon.src} height="100%" width="100%" />
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
