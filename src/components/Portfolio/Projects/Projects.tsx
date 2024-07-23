import { CustomCarousel, ProjectPanel } from '@barrel';
import { Stack, Typography } from '@mui/material';
import { ProjectDetails } from '@types';

const Projects = ({ projects }: { projects: { projects: ProjectDetails[]; id: string } }) => {
	const list = projects.projects.map((item, index) => {
		return {
			content: <ProjectPanel key={`project_panel_container_${index}`} project={item} />,
		};
	});

	return (
		<section id={projects.id} className="projects" aria-label="Projects section">
			<Stack sx={{ display: 'flex', justifyContent: 'center' }}>
				<Typography variant="h4" gutterBottom>
					Projects
				</Typography>
				<CustomCarousel width="100%" height="auto" list={list} sideArrows />
			</Stack>
		</section>
	);
};

export { Projects };
