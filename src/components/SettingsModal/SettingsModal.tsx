import { Box, Divider, Modal, styled, Typography } from '@mui/material';

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

const SettingsModal = (props: SettingsModalProps) => {
	const { open, onClose } = props;

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
