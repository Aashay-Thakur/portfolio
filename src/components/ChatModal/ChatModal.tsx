import { SyntheticEvent, useRef, useState } from 'react';

import { useAlert } from '@hooks/useAlert';
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

interface ChatModalProps {
	name: string;
}

const ChatModal = ({ name }: ChatModalProps) => {
	const geminiIcon = getIcon('gemini');
	name = name.split(' ')[0]; // get first name

	const [input, setInput] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [isError, setIsError] = useState<boolean>(false);

	const inputRef = useRef<HTMLTextAreaElement>(null);

	const modalAlert = useAlert();

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
			addMessage('gemini', response);
		} catch (error) {
			console.error(error);
			modalAlert('An error occurred. Please try again.');
			setIsError(true);
			removeLastMessage();
		} finally {
			inputRef.current?.focus();
			setLoading(false);
		}
	}

	function handleInputKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			onSend(e);
		}

		if (e.key === 'Tab') {
			e.preventDefault();
			if (!input.endsWith(' ') && input !== '') return;
			setInput(input[input.length - 1] === ' ' ? input + name : `${input} ${name}`);
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
				<Stack
					direction="row"
					sx={{
						alignItems: 'center',
						justifyContent: 'space-between',
						marginTop: 2,
					}}
					useFlexGap>
					<Typography variant="caption" color={isError ? 'error' : 'text.secondary'}>
						{isError
							? 'An error occurred. Please try again.'
							: 'Gemini can give wrong information. Please verify.'}
					</Typography>
					<Typography display={{ xs: 'none', md: 'initial' }} variant="caption" color="text.secondary">
						Press Tab to enter my name
					</Typography>
				</Stack>
				<TextField
					value={input}
					onChange={(e) => setInput(e.target.value)}
					type="text"
					id="question-input"
					variant="outlined"
					label="Ask Gemini About Me"
					onKeyDown={handleInputKeyDown}
					autoComplete="Aashay"
					InputProps={{
						inputRef,
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
