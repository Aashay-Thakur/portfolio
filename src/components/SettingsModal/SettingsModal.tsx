import { Box, Divider, Hidden, Modal, styled, SwipeableDrawer, Theme, Typography, useMediaQuery } from '@mui/material';
import { grey } from '@mui/material/colors';

import { ModalContent } from './ModalContent';

interface SettingsModalProps {
	open: boolean;
	onClose: () => void;
}

const StyledBox = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: `translate(-50%, calc(-54% + ${theme.appBarHeight}px))`,
	backgroundColor: theme.palette.background.paper,
	padding: theme.spacing(5),
	overflow: 'auto',
	maxHeight: '80vh',
	...theme.mixins.customScrollbar,
}));

const Puller = styled('div')(({ theme }) => ({
	width: 30,
	height: 6,
	backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
	borderRadius: 3,
	position: 'absolute',
	top: 8,
	left: 'calc(50% - 15px)',
}));

const SettingsModal = (props: SettingsModalProps) => {
	const { open, onClose } = props;
	const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
	const isSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

	if (isSm) {
		return (
			<SwipeableDrawer
				disableBackdropTransition={!iOS}
				disableDiscovery={iOS}
				anchor="bottom"
				open={open}
				onClose={onClose}
				onOpen={() => {}}>
				<Puller onClick={onClose} />
				<Box
					sx={{
						width: '100vw',
						padding: 2,
						backgroundColor: 'background.paper',
						overflow: 'auto',
						maxHeight: '80vh',
					}}>
					<Typography variant="h5">Settings</Typography>
					<Divider />
					<ModalContent />
				</Box>
			</SwipeableDrawer>
		);
	}

	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="modal-title"
			aria-describedby="modal-description"
			keepMounted>
			<StyledBox sx={{ width: { xs: '70vw', md: '50vw' } }}>
				<Typography variant="h5" id="modal-title">
					Settings
				</Typography>
				<Divider />
				<ModalContent />
			</StyledBox>
		</Modal>
	);
};

export { SettingsModal };
