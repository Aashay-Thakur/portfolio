import { CustomTabs, TechPanel } from '@barrel';
import { Stack, Typography } from '@mui/material';
import { SkillCategories } from '@types';

interface SkillProps {
	skills: {
		categories: SkillCategories;
		id: string;
	};
}

const Skills = ({ skills }: SkillProps) => {
	const { id, categories } = skills;

	const list = Object.keys(categories).map((category) => {
		const icons = Object.entries(categories[category]);
		return { label: category, content: <TechPanel icons={icons} /> };
	});

	return (
		<section id={id} className="skills" aria-label="Skills section">
			<Stack spacing={5}>
				<Typography marginTop={5} variant="h4" gutterBottom>
					Skills
				</Typography>
				<CustomTabs list={list} />
			</Stack>
		</section>
	);
};

export { Skills };

/**
 *
 * Skills Interface
 * Sorry for the mess 😓
 *
 * const skills = {
 *	id: 'skills',
 *	categories: {
 *		'databases': TechCategories: [
 *			{
 *				'MongoDB': {
 *					name: 'MongoDB',
 *					icon: 'mongodb',
 *					link: 'https://www.mongodb.com/',
 *				} : can be SkillIcon (single) or SkillIcon[] (multiple),
 *			},
 *			{
 *				'Linux': [
 *					{
 *						name: 'RHEL',
 *						icon: 'rhel',
 *						link: 'https://www.redhat.org/',
 *					},
 *					{
 *						name: 'Ubuntu',
 *						icon: 'ubuntu',
 *						link: 'https://ubuntu.com/',
 *					},
 *				],
 *		]
 *	 }
 * }
 */
