import { useAnimate } from 'framer-motion';
import { SyntheticEvent, useContext, useState } from 'react';

import { CustomLink, CustomSnackbar } from '@barrel';
import { PhoneAndroidSharp } from '@mui/icons-material';
import { Box, Portal } from '@mui/material';
import { PortalContext } from '@root/App';
import { SettingsContext } from '@settings';

interface PhoneAnimationProps {
	phoneNumber: string;
}

const PhoneAnimation = ({ phoneNumber }: PhoneAnimationProps) => {
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const [scope, animate] = useAnimate();

	const { disableAnimations } = useContext(SettingsContext);

	const portalRef = useContext(PortalContext);

	const handleCloseSnackbar = (_: SyntheticEvent | Event, reason?: string) => {
		if (reason !== 'clickaway') {
			setOpenSnackbar(false);
		}
	};

	const handleMouseEnter = () => {
		if (!disableAnimations) {
			animate('.icon', { left: '-20%' }, { delay: 0.5 });
			animate('.number', { width: '100%' }, { delay: 0.6 });
		}
	};

	const handleMouseLeave = () => {
		if (!disableAnimations) {
			animate('.icon', { left: '50%' }, { delay: 0.1 });
			animate('.number', { width: '0%' });
		}
	};

	const handleCopyPhone = () => {
		navigator.clipboard.writeText(phoneNumber);
		setOpenSnackbar(true);
	};

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					position: 'relative',
					alignItems: 'center',
					justifyContent: 'center',
					marginRight: { sm: 0, md: 5 },
					cursor: 'pointer',
				}}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onClick={handleCopyPhone}
				ref={scope}>
				<Box
					className="number"
					sx={{
						backgroundColor: 'background.default',
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						width: disableAnimations ? '100%' : '0%',
					}}>
					<CustomLink type="tel" to={`tel:${phoneNumber}`} aria-label="Phone link" disableCustomStyles>
						{phoneNumber}
					</CustomLink>
				</Box>
				<Box
					className="icon"
					sx={{
						position: 'absolute',
						left: disableAnimations ? '-20%' : '50%',
					}}>
					<PhoneAndroidSharp />
				</Box>
			</Box>
			<Portal container={portalRef?.current}>
				<CustomSnackbar
					open={openSnackbar}
					onClose={handleCloseSnackbar}
					message="Phone number copied to clipboard"
				/>
			</Portal>
		</>
	);
};

export { PhoneAnimation };
