import { useNavigate } from 'react-router';

import Logo from '@assets/Logo/Logo';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';

const Greeting = () => {
	const navigate = useNavigate();

	function handleOnClick() {
		localStorage.setItem('greeting', 'viewed');
		navigate('/', { replace: true });
	}

	return (
		<Grid
			sx={{
				justifyContent: 'center',
				alignItems: 'center',
				height: '100%',
				width: '100%',
				paddingTop: 2,
				padding: {
					xs: 2,
					sm: 0,
				},
			}}
			container>
			<Grid item xs={12}>
				<Box
					sx={{
						color: 'text.primary',
						height: 100,
					}}>
					<Logo />
				</Box>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Typography color="text.primary" variant="h4">
					Disclaimer
				</Typography>
				<Divider />
				<Typography color="text.primary" variant="h5" marginTop={2}>
					Hello,
				</Typography>
				<Typography component="div" textAlign="justify" color="text.primary" variant="body1">
					This project is a personal project of mine. It was made to give you a look at my capabilities and
					decide if I am a good candidate for you. <p />
					This in no way is made for Profit and for any organization or such entity but entirely owned by me.
					I have in no way designed this website to earn a profit and/or have monetized the website.
					<p />
					This website doesn't collect any of your data, may it be personal or public. That said, In order to
					give you the best experience this website makes use Cookies and/or Local Storage, for tasks like
					<Box>
						<ul>
							<li>Tracking if you have already seen this message</li>
							<li>Storing your saved Accessibility Settings</li>
						</ul>
					</Box>
					<p /> <abbr title="Too Long Didn't Read">tldr;</abbr>
					<p /> Website uses Cookies and/or Local Storage to save site settings, and nothing more. Website is
					not monetized.
				</Typography>
				<Typography
					component="div"
					sx={{
						textAlign: 'center',
						color: 'primary.main',
						margin: 5,
					}}
					variant="body2">
					Proceeding by clicking the below button is confirmation that you acknowledge this policy.
				</Typography>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						alignItems: 'center',
					}}>
					<Button onClick={handleOnClick}>Proceed</Button>
				</Box>
			</Grid>
		</Grid>
	);
};

export { Greeting };
