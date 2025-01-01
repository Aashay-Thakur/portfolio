import { stagger, useAnimate, useInView } from 'framer-motion';
import { useEffect } from 'react';

import { CustomLink } from '@barrel';
import { Box, Stack, Typography } from '@mui/material';
import { ContactInfo, SocialLink } from '@types';

import { DownloadResume } from './DownloadResume';
import { PhoneAnimation } from './PhoneAnimation';

function Contact({ contact }: { contact: ContactInfo }) {
	const [scope, animate] = useAnimate();
	const inView = useInView(scope, { once: true });

	useEffect(() => {
		if (inView) {
			animate(
				scope.current.children,
				{ opacity: [0, 1], y: [-10, 0] },
				{ delay: stagger(0.1, { startDelay: 0.2 }) },
			);
		}

		// Cleanup function to reset animations if needed
		return () => {
			animate(scope.current.children, { opacity: 0, y: 10 });
		};
	}, [inView]);

	return (
		<section id={contact.id} className="contact" aria-label="Contact section">
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 5 }}>
				<Typography marginTop={5} variant="h4" gutterBottom mt={0}>
					Contact
				</Typography>
				<Stack
					direction={{ xs: 'column', sm: 'row' }}
					sx={{
						justifyContent: 'center',
						alignItems: 'center',
						gap: { xs: 1, md: 0 },
					}}>
					<PhoneAnimation phoneNumber={contact.phone} />
					{contact.resume && (
						<DownloadResume
							email={contact.email}
							name={contact.name}
							resumeLink={contact.resume}
							phone={contact.phone}
							message={contact.emailMessage}
						/>
					)}
				</Stack>
			</Box>
			<Stack
				direction="row"
				ref={scope}
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
