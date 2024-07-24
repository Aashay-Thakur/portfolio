import { useContext } from 'react';

import { Timeline, TimelineNoAnim } from '@barrel';
import { Stack, Typography } from '@mui/material';
import { SettingsContext } from '@settings';
import { EducationDetails } from '@types';

const Academics = ({ academics }: { academics: { education: EducationDetails[]; id: string } }) => {
	const { disableAnimations } = useContext(SettingsContext);

	return (
		<section id={academics.id} className="contact" aria-label="Contact section">
			<Stack direction="column" spacing={5}>
				<Typography marginTop={5} variant="h4" gutterBottom>
					Academics
				</Typography>
				{disableAnimations ? (
					<TimelineNoAnim milestones={academics.education} />
				) : (
					<Timeline milestones={academics.education} />
				)}
			</Stack>
		</section>
	);
};

export { Academics };
