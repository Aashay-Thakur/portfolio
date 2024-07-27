import { Stack, Typography } from '@mui/material';
import { EducationDetails } from '@types';

const Milestone = ({ step }: { step: EducationDetails }) => {
	function getGrade(grade: EducationDetails['grade']): string {
		if (grade?.grade === undefined) return '';
		const type = grade.type === 'Percentage' ? '%' : ' CGPA';
		return `${grade.grade}${type}`;
	}

	return (
		<Stack spacing={2} sx={{ width: '100%', height: '100%', justifyContent: 'center' }} useFlexGap>
			<Stack
				direction="row"
				sx={{
					justifyContent: 'space-between',
					alignItems: 'flex-end',
					gap: 2,
				}}
				useFlexGap>
				<Stack
					direction="row"
					spacing={3}
					sx={{
						alignItems: 'flex-end',
					}}
					useFlexGap>
					<Typography variant="h4">{step.degree.short}</Typography>
					<Typography sx={{ fontWeight: 'bold' }} variant="h6">
						{step.endYear}
					</Typography>
				</Stack>
				<Typography variant="h5" fontSize={{ xs: 24 }}>
					{getGrade(step.grade)}
				</Typography>
			</Stack>
			<Typography variant="h5">{step.institute.full}</Typography>
		</Stack>
	);
};

export { Milestone };
