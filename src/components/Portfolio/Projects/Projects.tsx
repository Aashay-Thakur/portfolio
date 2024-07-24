import { SyntheticEvent, useContext, useReducer } from 'react';

import { CustomCarousel, ProjectPanel } from '@barrel';
import { Stack, Typography } from '@mui/material';
import { ProjectDetails } from '@types';

import { TocTabContext } from '../Portfolio';

const Projects = ({ projects }: { projects: { projects: ProjectDetails[]; id: string } }) => {
	const [updateHeight, forceUpdate] = useReducer((x) => x + 1, 0);
	const { activeProjectTab } = useContext(TocTabContext);

	function onTabChange(_: SyntheticEvent) {
		forceUpdate();
	}

	const list = projects.projects.map((item, index) => {
		return {
			content: <ProjectPanel onChange={onTabChange} key={`project_panel_container_${index}`} project={item} />,
		};
	});

	return (
		<section id={projects.id} className="projects" aria-label="Projects section">
			<Stack sx={{ display: 'flex', justifyContent: 'center' }}>
				<Typography variant="h4" gutterBottom>
					Projects
				</Typography>
				<CustomCarousel
					activeIndex={activeProjectTab}
					heightUpdateDependency={updateHeight}
					width="100%"
					height="auto"
					list={list}
					sideArrows
				/>
			</Stack>
		</section>
	);
};

export { Projects };
