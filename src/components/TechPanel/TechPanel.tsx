import { m } from 'framer-motion';
import { useContext } from 'react';

import { TechIcon } from '@barrel';
import { Grid } from '@mui/material';
import { SettingsContext } from '@settings';
import { SkillDetails } from '@types';

interface TechPanelProps {
	icons: [string, SkillDetails | SkillDetails[]][];
}

function spreadIcons(icons: [string, SkillDetails | SkillDetails[]][]): [string, SkillDetails][] {
	return icons.reduce<[string, SkillDetails][]>((acc, [label, skill]) => {
		if (Array.isArray(skill)) {
			const newSkill = skill.map((item) => [item.name, item] as [string, SkillDetails]);
			return [...acc, ...newSkill];
		}

		return [...acc, [label, skill]];
	}, []);
}

const TechPanel = (props: TechPanelProps) => {
	var { icons } = props;
	const { disableAnimations } = useContext(SettingsContext);

	icons = disableAnimations ? spreadIcons(icons) : icons;

	const delayDenom = 0.5 / icons.length;

	return (
		<Grid
			container
			spacing={{ xs: 1, sm: 3, md: 5 }}
			sx={{
				padding: { xs: 1, sm: 5 },
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			{icons.map((icon, index) => {
				const [label, iconData] = icon;
				return (
					<Grid key={index} item xs={4} sm={4} md={3} lg={2}>
						<m.div
							key={index}
							initial={!disableAnimations && { y: -20, opacity: 0 }}
							animate={!disableAnimations && { y: 0, opacity: 1 }}
							transition={{ delay: index * delayDenom }}
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							<TechIcon label={label} icon={iconData} />
						</m.div>
					</Grid>
				);
			})}
		</Grid>
	);
};

export { TechPanel };
