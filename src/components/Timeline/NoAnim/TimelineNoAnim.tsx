import { useContext, useEffect, useRef } from 'react';

import { Milestone } from '@barrel';
import { KeyboardArrowDownSharp, KeyboardArrowUpSharp } from '@mui/icons-material';
import { Box, IconButton, Paper, Stack, styled } from '@mui/material';
import { ActiveTab } from '@root/components/Portfolio/Portfolio';
import { EducationDetails } from '@types';

import styles from './TimelineNoAnim.module.scss';

const StyledPaper = styled(Paper)(({ theme }) => theme.mixins.customScrollbar);

const TimelineNoAnim = ({ milestones }: { milestones: EducationDetails[] }): JSX.Element => {
	const ref = useRef<HTMLDivElement>(null);
	const { activeAcademicTab } = useContext(ActiveTab);

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

	useEffect(() => {
		if (activeAcademicTab !== -1) {
			const element = document.getElementById(`milestone_${activeAcademicTab}`);
			if (element) {
				element.scrollIntoView({ behavior: 'instant', block: 'center' });
			}
		}
	}, [activeAcademicTab]);

	return (
		<Stack
			sx={{
				alignItems: 'center',
			}}
			spacing={3}
			useFlexGap>
			<Box>
				<IconButton onClick={() => scroll('up')}>
					<KeyboardArrowUpSharp fontSize="medium" />
				</IconButton>
			</Box>
			<StyledPaper ref={ref} elevation={12} className={styles.container}>
				{milestones.map((step, index) => {
					return (
						<Box id={`milestone_${index}`} key={index} className={styles.milestone}>
							<Box className={styles.timeline} />
							<Milestone step={step} />
						</Box>
					);
				})}
			</StyledPaper>
			<Box>
				<IconButton onClick={() => scroll('down')}>
					<KeyboardArrowDownSharp fontSize="medium" />
				</IconButton>
			</Box>
		</Stack>
	);
};

export { TimelineNoAnim };
