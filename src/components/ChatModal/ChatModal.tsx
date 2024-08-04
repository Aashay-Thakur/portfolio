import { SyntheticEvent, useState } from 'react';

import { Send } from '@mui/icons-material';
import {
	CircularProgress,
	Divider,
	Icon,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { getIcon } from '@techMap';
import { Message } from '@types';
import { askGeminiAI } from '@utils/fetch';

import { MessageBox } from './MessageBox';

const ChatModal = () => {
	const geminiIcon = getIcon('gemini');

	const [input, setInput] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [isError, setIsError] = useState<boolean>(false);

	function addMessage(sender: 'user' | 'gemini', message: string) {
		setMessages((prev) => [...prev, { sender, message }]);
	}

	function removeLastMessage() {
		setMessages((prev) => prev.slice(0, prev.length - 1));
	}

	async function onSend(e: SyntheticEvent) {
		e.preventDefault();
		if (input === '') return;
		setIsError(false);
		try {
			addMessage('user', input);
			setInput('');
			setLoading(true);
			const response = await askGeminiAI(input);
			setLoading(false);
			addMessage('gemini', response);
		} catch (error) {
			console.error(error);
			setIsError(true);
			removeLastMessage();
		}
	}

	return (
		<>
			<Typography variant="h4" gutterBottom>
				Ask Gemini
				<Icon sx={{ ml: 2 }}>
					<img src={geminiIcon.src} alt={geminiIcon.name} />
				</Icon>
			</Typography>
			<Divider />
			<Stack spacing={2} direction="column">
				<MessageBox messages={messages} />
				<Typography variant="caption" color={isError ? 'error' : 'text.secondary'}>
					{isError
						? 'An error occurred. Please try again.'
						: 'Gemini can give wrong information. Please verify.'}
				</Typography>
				<TextField
					value={input}
					onChange={(e) => setInput(e.target.value)}
					type="text"
					id="question-input"
					variant="outlined"
					label="Ask Gemini About Me"
					onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && onSend(e)}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								{loading ? (
									<CircularProgress size={20} />
								) : (
									<IconButton onClick={onSend} type="submit">
										<Send />
									</IconButton>
								)}
							</InputAdornment>
						),
					}}
					disabled={loading}
					multiline
					fullWidth
				/>
			</Stack>
		</>
	);
};

export { ChatModal };
