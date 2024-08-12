import { useState } from 'react';

import { Box, Button, Divider, Input, Modal, Stack, Typography } from '@mui/material';

interface PromptProps {
	message: string;
	onClose: (response: string) => void;
}

const Prompt = ({ message, onClose }: PromptProps) => {
	const [input, setInput] = useState<string>('');

	return (
		<Modal open={true} onClose={() => onClose('')}>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: 400,
					bgcolor: 'background.paper',
					border: 'none',
					outline: 'none',
					boxShadow: 24,
					p: 4,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					gap: 2,
				}}>
				<Typography variant="h3" gutterBottom>
					Alert
				</Typography>
				<Divider />
				<Typography variant="body1">{message}</Typography>
				<Input value={input} onChange={(e) => setInput(e.target.value)} />
				<Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
					<Button variant="contained" onClick={() => onClose(input)}>
						OK
					</Button>
					<Button variant="text" onClick={() => onClose('')}>
						Cancel
					</Button>
				</Stack>
			</Box>
		</Modal>
	);
};

export default Prompt;
