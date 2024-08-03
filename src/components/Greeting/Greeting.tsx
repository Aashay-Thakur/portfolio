import { useContext } from 'react';
import { useNavigate } from 'react-router';

import AnimatedLogo from '@assets/Logo/AnimatedLogo';
import { CustomPopup } from '@barrel';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { SettingsContext } from '@settings';

const Greeting = () => {
	const navigate = useNavigate();
	const { toggleDyslexicFont } = useContext(SettingsContext);

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
					<AnimatedLogo />
				</Box>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}>
					<Typography color="text.primary" variant="h4">
						Disclaimer
					</Typography>
					<Button onClick={toggleDyslexicFont}>Dyslexic</Button>
				</Box>
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
					<p />
				</Typography>
				<Grid item xs={1}>
					<Typography component="div" textAlign="justify" color="text.primary" variant="body1">
						<CustomPopup
							sx={{
								color: 'white',
							}}
							message="Too Long, Didn't Read">
							tldr;
						</CustomPopup>
					</Typography>
				</Grid>
				<Typography component="div" textAlign="justify" color="text.primary" variant="body1">
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
