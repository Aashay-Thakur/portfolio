import { useState } from 'react';

import { Button, Divider, Modal, Paper, Stack, TextField, Typography } from '@mui/material';

interface PromptProps {
	message: string;
	onClose: (response: string) => void;
}

const Prompt = ({ message, onClose }: PromptProps) => {
	const [input, setInput] = useState<string>('');

	return (
		<Modal open={true} onClose={() => onClose('')}>
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
				<Typography variant="h3" gutterBottom>
					Alert
				</Typography>
				<Divider />
				<Typography variant="body1">{message}</Typography>
				<TextField variant="standard" label="Email" value={input} onChange={(e) => setInput(e.target.value)} />
				<Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
					<Button variant="contained" onClick={() => onClose(input)}>
						OK
					</Button>
					<Button variant="text" onClick={() => onClose('')}>
						Cancel
					</Button>
				</Stack>
			</Paper>
		</Modal>
	);
};

export default Prompt;
