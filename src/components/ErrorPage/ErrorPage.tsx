import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Error404 from '@assets/CustomIcons/Error404';
import ErrorSvg from '@assets/CustomIcons/ErrorSvg';
import { CustomLink } from '@barrel';
import { Box, Button, Stack, Typography } from '@mui/material';

const ErrorPage = () => {
	const { state } = useLocation();
	const navigate = useNavigate();
	const error = state?.error;

	useEffect(() => {
		if (!error) {
			navigate('/');
		}
	}, [error, navigate]);

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
				background: 'background.default',
				color: 'text.primary',
			}}>
			<Stack alignItems="center" spacing={2}>
				{error?.status === 404 ? <Error404 /> : <ErrorSvg />}
				<Typography variant="h5">{error?.statusText}</Typography>
				<CustomLink to="/" disableCustomStyles>
					<Button>Go Home</Button>
				</CustomLink>
			</Stack>
		</Box>
	);
};

export { ErrorPage };
