import { CustomLink } from '@barrel';
import { Box, Stack, Typography } from '@mui/material';
import { ContactInfo, SocialLink } from '@types';

import { DownloadResume } from './DownloadResume';
import { PhoneAnimation } from './PhoneAnimation';

function Contact({ contact }: { contact: ContactInfo }) {
	return (
		<section id={contact.id} className="contact" aria-label="Contact section">
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 5 }}>
				<Typography marginTop={5} variant="h4" gutterBottom mt={0}>
					Contact
				</Typography>
				<Stack
					direction={{ xs: 'column', md: 'row' }}
					sx={{
						justifyContent: 'center',
						alignItems: 'center',
						gap: { xs: 1, md: 5 },
					}}>
					<PhoneAnimation phoneNumber={contact.phone} />
					{contact.resume && <DownloadResume name={contact.name} resumeLink={contact.resume} />}
				</Stack>
			</Box>
			<Stack
				direction="row"
				sx={{
					flexWrap: 'wrap',
					justifyContent: 'center',
					alignItems: 'center',
					fontSize: 20,
					gap: { xs: 5, md: 10 },
					mt: 5,
				}}
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
		</section>
	);
}

export { Contact };
