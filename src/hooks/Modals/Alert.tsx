import { Button, Divider, Modal, Paper, Typography } from '@mui/material';

interface AlertProps {
	message: string;
	onClose: () => void;
}

const Alert = ({ message, onClose }: AlertProps) => {
	return (
		<Modal open={true} onClose={() => null}>
			<Paper
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 400,
					border: 'none',
					outline: 'none',
					boxShadow: 24,
					p: 4,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					gap: 2,
				}}>
				<Typography variant="h3">Alert</Typography>
				<Divider />
				<Typography mt={2} mb={2} variant="body1">
					{message}
				</Typography>
				<Button variant="contained" onClick={onClose}>
					OK
				</Button>
			</Paper>
		</Modal>
	);
};

export default Alert;
