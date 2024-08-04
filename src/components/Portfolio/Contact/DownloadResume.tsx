import { m } from 'framer-motion';
import { SyntheticEvent, useContext, useMemo, useState } from 'react';

import { DownloadIcon } from '@assets/CustomIcons/DownloadIcon';
import { Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import { SettingsContext } from '@settings';

interface DownloadResumeProps {
	resumeLink: string | { download: string; file: string };
	name: string;
}

const MotionTypography = m(Typography);

const DownloadResume = ({ resumeLink, name }: DownloadResumeProps) => {
	const [hovering, setHovering] = useState(false);
	const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
	const { disableAnimations } = useContext(SettingsContext);

	const checkAnimSetting = useMemo(() => (props: any) => disableAnimations ? {} : props, [disableAnimations]);

	const onClickHandler = (e: SyntheticEvent) => {
		e.preventDefault();
		if (typeof resumeLink === 'string') {
			window.open(resumeLink, '_blank');
		} else {
			const link = document.createElement('a');
			link.href = resumeLink.download;
			link.download = `${name} - Resume`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	};

	return (
		<Stack
			sx={{ cursor: 'pointer' }}
			direction="row"
			onMouseEnter={() => setHovering(true)}
			onMouseLeave={() => setHovering(false)}
			onClick={onClickHandler}>
			<DownloadIcon active={!disableAnimations && hovering} />
			<MotionTypography
				initial={checkAnimSetting(isXs || disableAnimations ? { x: 0, opacity: 1 } : { x: 10, opacity: 0 })}
				animate={checkAnimSetting(
					isXs || disableAnimations ? {} : { x: hovering ? 0 : 10, opacity: hovering ? 1 : 0 },
				)}
				sx={{
					whiteSpace: 'nowrap',
					transformOrigin: 'left',
				}}
				variant="body1"
				color="text.primary">
				Download Resume
			</MotionTypography>
		</Stack>
	);
};

export { DownloadResume };
