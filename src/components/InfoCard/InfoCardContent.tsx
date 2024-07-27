import { forwardRef, useEffect, useState } from 'react';

import { CustomCard } from '@barrel';
import { Skeleton, Stack, Typography } from '@mui/material';
import { SkillDetails } from '@types';
import { Extract, fetchWiki } from '@utils/fetch';
import { truncate } from '@utils/helper';

interface InfoCardContentProps {
	skill: SkillDetails;
}

const InfoCardContent = forwardRef<HTMLDivElement, InfoCardContentProps>(({ skill }, ref) => {
	const [data, setData] = useState<Extract | null | 'error'>(null);

	useEffect(() => {
		const fetchTopic = async () => {
			try {
				const res = await fetchWiki(skill.wikiTopic);
				setData(res);
			} catch {
				setData('error');
			}
		};

		fetchTopic();
	}, [skill.wikiTopic]);

	if (!data) {
		return (
			<CustomCard ref={ref}>
				<Stack sx={{ justifyContent: 'space-between', marginBottom: 1 }} useFlexGap>
					<Typography variant="h4" component="div">
						<Skeleton animation="wave" sx={{ width: '50%' }} />
					</Typography>
					<Skeleton variant="rectangular" height={200} animation="wave" />
				</Stack>
				{new Array(5).fill(null).map((_, index) => (
					<Skeleton key={index} variant="text" animation="wave" width={index === 4 ? '50%' : '100%'} />
				))}
			</CustomCard>
		);
	}

	if (data === 'error') {
		return (
			<CustomCard ref={ref} headerProps={{ title: 'Error', subheader: '500' }}>
				<Typography variant="h4" gutterBottom>
					Something Went Wrong!
				</Typography>
				<Typography variant="body1">Sorry! There was a problem while fetching the information.</Typography>
			</CustomCard>
		);
	}

	const actions = [{ title: 'Learn More', link: skill.link }];
	if (data?.extract) {
		actions.push({ title: 'Wikipedia', link: skill.wikiLink });
	}

	return (
		<CustomCard
			ref={ref}
			headerProps={{ title: data.title, subheader: data.pronounciation }}
			mediaProps={{
				component: 'img',
				src: data.thumbnail || skill.src,
				alt: skill.name,
				draggable: false,
			}}
			actions={actions}>
			<Typography variant="body2">
				{truncate(
					data.extract ||
						'No Information Available on Wikipedia. You can still visit the Official Page by clicking Learn More.',
					200,
				)}
			</Typography>
		</CustomCard>
	);
});

export { InfoCardContent };
