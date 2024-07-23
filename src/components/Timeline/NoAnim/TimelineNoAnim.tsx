import { useRef } from 'react';

import { CustomIcon, Milestone } from '@barrel';
import { Box, IconButton, Paper, Stack, styled } from '@mui/material';
import { EducationDetails } from '@types';

import styles from './TimelineNoAnim.module.scss';

const StyledPaper = styled(Paper)(({ theme }) => theme.mixins.customScrollbar);

const TimelineNoAnim = ({ milestones }: { milestones: EducationDetails[] }): JSX.Element => {
	const ref = useRef<HTMLDivElement>(null);

	function scroll(direction: 'up' | 'down') {
		if (ref.current) {
			const scrollAmount = ref.current.clientHeight;

			if (direction === 'up') {
				ref.current.scrollTop -= scrollAmount;
			} else if (direction === 'down') {
				ref.current.scrollTop += scrollAmount;
			}
		}
	}

	return (
		<Stack
			sx={{
				alignItems: 'center',
			}}
			spacing={3}
			useFlexGap>
			<Box>
				<IconButton onClick={() => scroll('up')}>
					<CustomIcon fontSize={22} icon={['fas', 'angle-down']} className="fa-rotate-180" />
				</IconButton>
			</Box>
			<StyledPaper ref={ref} elevation={12} className={styles.container}>
				{milestones.map((step, index) => {
					return (
						<Box key={index} className={styles.milestone}>
							<Box className={styles.timeline} />
							<Milestone step={step} />
						</Box>
					);
				})}
			</StyledPaper>
			<Box>
				<IconButton onClick={() => scroll('down')}>
					<CustomIcon fontSize={22} icon={['fas', 'angle-down']} />
				</IconButton>
			</Box>
		</Stack>
	);
};

export { TimelineNoAnim };
