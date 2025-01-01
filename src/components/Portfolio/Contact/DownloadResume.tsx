import { getBlob, getDownloadURL } from 'firebase/storage';
import { m } from 'framer-motion';
import { SyntheticEvent, useContext, useRef, useState } from 'react';

import { DownloadIcon } from '@assets/CustomIcons/DownloadIcon';
import { CustomSnackbar } from '@barrel';
import { useAlert } from '@hooks/useAlert';
import { usePrompt } from '@hooks/usePrompt';
import { Menu, MenuItem, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import { resumeRef } from '@root/contexts/data/firebase-config';
import { SettingsContext } from '@settings';
import { sendResumeOverEmail } from '@utils/fetch';

interface DownloadResumeProps {
	resumeLink: string | { download: string; file: string };
	name: string;
	email: string;
}

const MotionTypography = m(Typography);

const DownloadResume = ({ resumeLink, name, email }: DownloadResumeProps) => {
	const [hovering, setHovering] = useState(false);
	const [openMenu, setOpenMenu] = useState<boolean>(false);
	const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

	const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
	const { disableAnimations } = useContext(SettingsContext);

	const iconRef = useRef(null);

	const checkAnimSetting = (props: any) => (disableAnimations ? {} : props);

	const modalAlert = useAlert();
	const modalPrompt = usePrompt();

	const onClickHandler = () => {
		if (typeof resumeLink === 'string') {
			window.open(resumeLink, '_blank');
		} else {
			setOpenMenu(true);
		}
	};

	const handleCloseSnackbar = (_: SyntheticEvent | Event, reason?: string) => {
		if (reason !== 'clickaway') {
			setOpenSnackbar(false);
		}
	};

	const handleDownload = async (): Promise<void> => {
		if (!resumeRef) return;
		setOpenMenu(false);
		try {
			const blob = await getBlob(resumeRef);
			const url = URL.createObjectURL(blob);

			const a = document.createElement('a');
			a.href = url;
			a.download = `${name} - Resume.pdf`;

			document.body.appendChild(a);

			a.click();

			document.body.removeChild(a);
			URL.revokeObjectURL(url);

			modalAlert('Resume downloaded successfully.');
		} catch (error) {
			console.error('Error downloading resume:', error);
			modalAlert('Error downloading resume. Please try again later.');
		}
	};

	const handleSendOverMail = async (): Promise<void> => {
		if (!resumeRef) return;
		setOpenMenu(false);

		var to = null;
		to = await modalPrompt('Enter the email address you want to send the resume to');
		if (!to || to === '') return;

		const link = await getDownloadURL(resumeRef);
		const data = {
			to,
			from: email,
			name,
			link,
		};

		try {
			setOpenSnackbar(true);
			await sendResumeOverEmail(data);
		} catch (error) {
			console.error('Error sending email:', error);
			modalAlert('Error sending email. Please try again later.');
			setOpenSnackbar(false);
		}
	};

	return (
		<>
			<Stack
				ref={iconRef}
				sx={{ cursor: 'pointer' }}
				direction="row"
				onMouseEnter={() => setHovering(true)}
				onMouseLeave={() => setHovering(false)}
				onClick={onClickHandler}>
				<DownloadIcon active={!disableAnimations && hovering} />
				<MotionTypography
					initial={checkAnimSetting(isXs || disableAnimations ? { x: 0, opacity: 1 } : { x: 10, opacity: 0 })}
					animate={checkAnimSetting(
						isXs || disableAnimations ? {} : { x: hovering ? 5 : 15, opacity: hovering ? 1 : 0 },
					)}
					sx={{
						whiteSpace: 'nowrap',
						transformOrigin: 'left',
					}}
					variant="body1"
					color="text.primary">
					{isXs ? 'Resume' : `Download Resume`}
				</MotionTypography>
			</Stack>
			{typeof resumeLink !== 'string' && (
				<Menu anchorEl={iconRef.current} open={openMenu} onClose={() => setOpenMenu(false)}>
					<MenuItem onClick={handleDownload}>Download</MenuItem>
					<MenuItem onClick={handleSendOverMail}>Send it over email</MenuItem>
				</Menu>
			)}
			<CustomSnackbar open={openSnackbar} onClose={handleCloseSnackbar} message="Sending Email..." />
		</>
	);
};

export { DownloadResume };
