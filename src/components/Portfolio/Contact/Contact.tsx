import { motion } from 'framer-motion';
/* react */
import { SyntheticEvent, useContext, useState } from 'react';

/* components */
import { CustomIcon, CustomLink, CustomSnackbar } from '@barrel';
/* material-ui */
import { Box, Portal, Stack, Typography } from '@mui/material';
import { PortalContext } from '@root/App';
import { SettingsContext } from '@settings';
/* types */
import { ContactInfo, SocialLink } from '@types';

const MotionBox = motion(Box);

function Contact({ contact }: { contact: ContactInfo }) {
	const portalRef = useContext(PortalContext);
	const { disableAnimations } = useContext(SettingsContext);
	const [mouseOnContact, setMouseOnContact] = useState(false);
	const [openSnackbar, setOpenSnackbar] = useState(false);

	const BoxProps = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 2,
	};

	function checkAnimSetting(props: any) {
		return disableAnimations ? {} : props;
	}

	function closeSnackbar(_: SyntheticEvent | Event, reason?: string) {
		if (reason !== 'clickaway') {
			setOpenSnackbar(false);
		}
	}

	function copyPhone() {
		navigator.clipboard.writeText(contact.phone);
		setOpenSnackbar(true);
	}

	return (
		<section id={contact.id} className="contact" aria-label="Contact section">
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Typography marginTop={5} variant="h4" gutterBottom>
					Contact
				</Typography>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						marginRight: { sm: 0, md: 5 },
						marginTop: 5,
						cursor: 'pointer',
					}}
					onMouseEnter={() => setMouseOnContact(true)}
					onMouseLeave={() => setMouseOnContact(false)}
					onClick={copyPhone}>
					<MotionBox
						initial={{ width: disableAnimations ? '100%' : '0%' }}
						animate={checkAnimSetting({ width: mouseOnContact ? '100%' : 0 })}
						transition={checkAnimSetting({ delay: 0.5, easings: 'linear' })}
						sx={{
							backgroundColor: 'background.default',
							textWrap: 'nowrap',
							width: '100%',
							transformOrigin: 'left',
							overflow: 'hidden',
						}}>
						<CustomLink type="tel" to={`tel:${contact.phone}`} aria-label="Phone link" disableCustomStyles>
							{contact.phone}
						</CustomLink>
					</MotionBox>
					<MotionBox
						initial={{ x: disableAnimations ? -150 : 0 }}
						animate={checkAnimSetting({ x: mouseOnContact ? -150 : 0 })}
						transition={checkAnimSetting({ delay: mouseOnContact ? 0.5 : 0.7 })}>
						<CustomIcon
							icon={['fas', 'phone']}
							size="lg"
							style={{ '--fa-animation-iteration-count': 1 }}
							className={mouseOnContact ? 'fa-shake' : ''}
						/>
					</MotionBox>
				</Box>
			</Box>
			<Stack
				direction="row"
				useFlexGap
				flexWrap="wrap"
				justifyContent="center"
				alignItems="center"
				fontSize={20}
				gap={{
					xs: 5,
					md: 10,
				}}
				marginTop={5}
				aria-label="Social links">
				{contact?.socials &&
					Array.from(contact.socials).map((social: SocialLink) => {
						return (
							<CustomLink
								key={social.text.toLowerCase().replace(' ', '-')}
								to={social.link}
								target="_blank"
								rel="noreferrer"
								aria-label="Email link"
								shouldUseIcon>
								<Box {...BoxProps}>
									<CustomIcon icon={social.icon} />
									{social.text}
								</Box>
							</CustomLink>
						);
					})}
			</Stack>
			<Portal container={portalRef?.current}>
				<CustomSnackbar
					open={openSnackbar}
					onClose={closeSnackbar}
					message="Phone number copied to clipboard"
				/>
			</Portal>
		</section>
	);
}

export { Contact };
