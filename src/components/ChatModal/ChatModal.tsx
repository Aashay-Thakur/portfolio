import { Divider, Icon, Typography } from '@mui/material';
import { getIcon } from '@techMap';

const ChatModal = () => {
	const geminiIcon = getIcon('gemini');

	return (
		<>
			<Typography variant="h4" gutterBottom>
				Ask Gemini
				<Icon sx={{ ml: 2 }}>
					<img src={geminiIcon.src} alt={geminiIcon.name} />
				</Icon>
			</Typography>
			<Divider />
		</>
	);
};

export { ChatModal };
