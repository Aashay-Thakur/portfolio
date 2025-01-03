import { useContext } from 'react';

import { CustomCarousel, Milestone } from '@barrel';
import { Paper, useTheme } from '@mui/material';
import { EducationDetails } from '@types';

import { ActiveTab } from '../Portfolio/Portfolio';

const Timeline = ({ milestones }: { milestones: EducationDetails[] }) => {
	const theme = useTheme();
	const { activeAcademicTab } = useContext(ActiveTab);
	const list = milestones.map((milestone, index) => {
		return {
			content: (
				<Paper
					sx={{
						height: '100%',
						width: '100%',
						padding: 5,
						background: theme.mixins.linearGradient(theme, { opacity: 1, direction: '-45deg' }),
						color: 'hsl(0, 0%, 100%)',
					}}
					elevation={5}>
					<Milestone key={index} step={milestone} />
				</Paper>
			),
		};
	});

	return <CustomCarousel activeIndex={activeAcademicTab} width="100%" height={200} list={list} pagination />;
};

export { Timeline };
