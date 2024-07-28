import { Grid, Typography } from '@mui/material';
import { EducationDetails } from '@types';
import { getGrade } from '@utils/helper';

const Milestone = ({ step }: { step: EducationDetails }) => {
	return (
		<Grid
			sx={{
				alignItems: 'flex-end',
			}}
			spacing={2}
			container>
			<Grid item>
				<Typography fontSize={{ xs: 24, sm: 34 }}>{step.degree.short}</Typography>
			</Grid>
			<Grid item>
				<Typography>{step.endYear}</Typography>
			</Grid>
			<Grid flexGrow={1} textAlign={{ sm: 'right' }} item>
				<Typography fontSize={{ xs: 22, sm: 28 }}>{getGrade(step.grade)}</Typography>
			</Grid>
			<Grid xs={12} item>
				<Typography fontSize={{ xs: 16, sm: 24 }}>
					{step.institute.full} ({step.institute.short})
				</Typography>
			</Grid>
		</Grid>
	);
};

export { Milestone };
