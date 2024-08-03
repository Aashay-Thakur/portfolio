import { motion } from 'framer-motion';
import { ErrorResponse, useNavigate, useRouteError } from 'react-router-dom';

import { Box, Button, Stack, Typography, useTheme } from '@mui/material';

const ErrorPage = () => {
	const routerError = useRouteError();
	const navigate = useNavigate();
	const theme = useTheme();

	const error = routerError as ErrorResponse;

	return (
		<Box
			sx={{
				position: 'fixed',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: '100%',
				overflow: 'hidden',
				background: theme.palette.background.default,
				color: theme.palette.text.primary,
			}}>
			<Stack alignItems="center" spacing={2}>
				<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200">
					<motion.text
						x="50%"
						y="50%"
						dominantBaseline="middle"
						textAnchor="middle"
						fontFamily="Lato"
						fontSize="80"
						fill="currentColor"
						stroke="currentColor"
						strokeWidth="2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1 }}>
						{error.status}
					</motion.text>
				</svg>
				<Typography variant="h5">{error?.statusText}</Typography>
				<Button onClick={() => navigate('/')}>Go Home</Button>
			</Stack>
		</Box>
	);
};

export { ErrorPage };
