import { useAnimate } from 'framer-motion';
import { SyntheticEvent, useContext, useState } from 'react';

import { CustomLink, CustomSnackbar } from '@barrel';
import { PhoneAndroidSharp } from '@mui/icons-material';
import { Box, Portal, Stack, Typography } from '@mui/material';
import { PortalContext } from '@root/App';
import { SettingsContext } from '@settings';
import { ContactInfo, SocialLink } from '@types';

function Contact({ contact }: { contact: ContactInfo }) {
	const portalRef = useContext(PortalContext);
	const { disableAnimations } = useContext(SettingsContext);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [scope, animate] = useAnimate();

	const handleMouseEnter = () => {
		if (!disableAnimations) {
			animate('.icon', { left: '-20%' }, { delay: 0.5 });
			animate('.number', { width: '100%' }, { delay: 0.6 });
		}
	};

	const handleMouseLeave = () => {
		if (!disableAnimations) {
			animate('.icon', { left: '50%' }, { delay: 0.1 });
			animate('.number', { width: '0%' });
		}
	};

	const handleCopyPhone = () => {
		navigator.clipboard.writeText(contact.phone);
		setOpenSnackbar(true);
	};

	const handleCloseSnackbar = (_: SyntheticEvent | Event, reason?: string) => {
		if (reason !== 'clickaway') {
			setOpenSnackbar(false);
		}
	};

	return (
		<section id={contact.id} className="contact" aria-label="Contact section">
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Typography marginTop={5} variant="h4" gutterBottom>
					Contact
				</Typography>
				<Box
					sx={{
						display: 'flex',
						position: 'relative',
						alignItems: 'center',
						justifyContent: 'center',
						marginRight: { sm: 0, md: 5 },
						marginTop: 5,
						cursor: 'pointer',
					}}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
					onClick={handleCopyPhone}
					ref={scope}>
					<Box
						className="number"
						sx={{
							backgroundColor: 'background.default',
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							width: disableAnimations ? '100%' : '0%',
						}}>
						<CustomLink type="tel" to={`tel:${contact.phone}`} aria-label="Phone link" disableCustomStyles>
							{contact.phone}
						</CustomLink>
					</Box>
					<Box
						className="icon"
						sx={{
							position: 'absolute',
							left: disableAnimations ? '-20%' : '50%',
						}}>
						<PhoneAndroidSharp />
					</Box>
				</Box>
			</Box>
			<Stack
				direction="row"
				flexWrap="wrap"
				justifyContent="center"
				alignItems="center"
				fontSize={20}
				gap={{ xs: 5, md: 10 }}
				marginTop={5}
				aria-label="Social links">
				{contact.socials?.map((social: SocialLink) => (
					<CustomLink
						key={social.text.toLowerCase().replace(' ', '-')}
						to={social.link}
						target="_blank"
						rel="noreferrer"
						aria-label={`${social.text} link`}
						shouldUseIcon>
						<Box display="flex" alignItems="center" justifyContent="center" gap={2}>
							<social.icon />
							{social.text}
						</Box>
					</CustomLink>
				))}
			</Stack>
			<Portal container={portalRef?.current}>
				<CustomSnackbar
					open={openSnackbar}
					onClose={handleCloseSnackbar}
					message="Phone number copied to clipboard"
				/>
			</Portal>
		</section>
	);
}

export { Contact };
