import { Grid, Typography } from '@mui/material';
import { EducationDetails } from '@types';

const Milestone = ({ step }: { step: EducationDetails }) => {
	function getGrade(grade: EducationDetails['grade']): string {
		if (grade?.grade === undefined) return '';
		const type = grade.type === 'Percentage' ? '%' : ' CGPA';
		return `${grade.grade}${type}`;
	}

	return (
		<Grid container spacing={2}>
			<Grid sx={{ alignItems: 'flex-end' }} spacing={2} container item>
				<Grid item>
					<Typography variant="h4">{step.degree.short}</Typography>
				</Grid>
				<Grid flexGrow={1} item>
					<Typography sx={{ fontWeight: 'bold' }} variant="h6">
						{step.endYear}
					</Typography>
				</Grid>
				<Grid item>
					<Typography variant="h5">{getGrade(step.grade)}</Typography>
				</Grid>
			</Grid>
			<Grid item>
				<Typography variant="h5">{step.institute.full}</Typography>
			</Grid>
		</Grid>
	);
};

export { Milestone };
