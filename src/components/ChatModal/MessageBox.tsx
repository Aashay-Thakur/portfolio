import { useEffect, useRef } from 'react';

import { MarkdownRenderer } from '@barrel';
import { Box, BoxProps, Paper, Stack, styled, Typography } from '@mui/material';
import { Message } from '@types';

interface MessageBoxProps {
	messages: Message[];
}

const MessageItem = styled(Box, {
	shouldForwardProp: (prop) => prop !== 'sentByUser',
})<BoxProps & { sentByUser: boolean }>(({ theme, sentByUser }) => ({
	'position': 'relative',
	'padding': theme.spacing(1),
	'borderRadius': '5px',
	'marginLeft': theme.spacing(3),
	'marginRight': theme.spacing(3),
	'marginTop': theme.spacing(1),
	'marginBottom': theme.spacing(3),
	'background': sentByUser
		? theme.mixins.linearGradient(theme)
		: theme.mixins.linearGradient(theme, { direction: '135deg' }),
	'color': sentByUser ? theme.palette.primary.contrastText : theme.palette.secondary.contrastText,
	'width': 'fit-content',
	'alignSelf': sentByUser ? 'flex-end' : 'flex-start',
	'maxWidth': '70%',
	'minWidth': '20%',
	'boxShadow': `2px 2px 10px 0 ${theme.palette.mode === 'dark' ? '#ffffff40' : '#00000040'}`,
	'&::after': {
		content: `"${sentByUser ? 'You' : 'Gemini'}"`,
		position: 'absolute',
		color: theme.palette.text.secondary,
		fontSize: '0.75rem',
		bottom: '-1.5rem',
		right: sentByUser ? '0' : '',
		left: sentByUser ? '' : '0',
	},
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
	...theme.mixins.customScrollbar,
	height: '45vh',
	overflowY: 'auto',
	padding: theme.spacing(2),
}));

const StartMessage = styled(Typography)(({ theme }) => ({
	color: theme.palette.text.secondary,
	textAlign: 'center',
}));

// Add Animations
const MessageBox = ({ messages }: MessageBoxProps) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.scrollTop = containerRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<StyledPaper ref={containerRef}>
			<Stack direction="column">
				<StartMessage variant="caption">Start a conversation with Gemini</StartMessage>
				{messages.map((message, index) => (
					<MessageItem key={index} sentByUser={message.sender === 'user'}>
						<MarkdownRenderer markdown={message.message} />
					</MessageItem>
				))}
			</Stack>
		</StyledPaper>
	);
};

export { MessageBox };
