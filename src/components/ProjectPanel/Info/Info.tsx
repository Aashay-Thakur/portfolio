import { CustomLink } from '@barrel';
import { Web } from '@mui/icons-material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Stack, Typography } from '@mui/material';
import { ProjectDetails } from '@types';

import { Features } from './Features';

interface InfoProps {
	info: {
		description: string;
		links: ProjectDetails['links'];
		features?: ProjectDetails['features'];
	};
}

const Info = ({ info }: InfoProps) => {
	return (
		<Stack
			spacing={2}
			sx={{
				padding: { md: 5, xs: 2 },
			}}>
			<div>
				<Typography variant="h5">Links</Typography>
				<Box
					sx={{
						'display': 'flex',
						'justifyContent': { xs: 'flex-start', md: 'flex-end' },
						'alignItems': 'center',
						'flexDirection': 'row',
						'width': '100%',
						'gap': 2,
						'fontSize': 20,
						'flexWrap': 'wrap',
						'padding': { xs: 2, md: 0 },
						'& > div:hover': {
							color: 'primary.main',
						},
					}}>
					<div>
						<CustomLink to={info.links.repo} target="_blank" shouldUseIcon disableCustomStyles>
							<GitHubIcon />
							Repository
						</CustomLink>
					</div>
					{info.links.website && (
						<div>
							<CustomLink to={info.links.website} target="_blank" shouldUseIcon disableCustomStyles>
								<Web />
								Live Website
							</CustomLink>
						</div>
					)}
				</Box>
			</div>
			<Typography variant="h5">Description</Typography>
			<Typography sx={{ wordBreak: 'break-word', textAlign: 'justify' }} variant="body1">
				{info.description}
			</Typography>
			{info?.features && <Features features={info.features} />}
		</Stack>
	);
};

export { Info };
