import { Box, Typography } from '@mui/material';
import { SkillDetails } from '@types';

interface TechnologyProps {
	stack: SkillDetails[];
}

const Technology = ({ stack }: TechnologyProps) => {
	return (
		<Box
			sx={{
				padding: 5,
			}}>
			<Typography variant="body1">{stack.map((skill) => skill.name).join(', ')}</Typography>
		</Box>
	);
};

export { Technology };
