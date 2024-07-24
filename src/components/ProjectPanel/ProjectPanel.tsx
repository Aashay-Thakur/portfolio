import { ReactEventHandler } from 'react';

import { CustomTabs } from '@barrel';
import { Stack, Typography } from '@mui/material';
import { ProjectDetails } from '@types';

import { Architecture } from './Architecture/Architecture';
import { Info } from './Info/Info';
import { Technology } from './Technology/Technology';

const ProjectPanel = ({ project, onChange }: { project: ProjectDetails; onChange?: ReactEventHandler }) => {
	const { description, features, links, title, techStack } = project;

	const infoData = {
		description,
		links,
		features,
	};

	const list = [
		{ label: 'Info', content: <Info info={infoData} /> },
		{ label: 'Technology', content: <Technology stack={techStack} /> },
		{ label: 'Architecture', content: <Architecture /> },
	];

	return (
		<Stack width="100%" height="100%" spacing={1}>
			<Typography width="100%" align="center" variant="h4">
				{title}
			</Typography>
			<CustomTabs onChange={onChange} list={list} />
		</Stack>
	);
};

export { ProjectPanel };
