/* react */
import { createContext, useContext, useEffect, useState } from 'react';

/* components */
import { Appbar, TOC } from '@barrel';
/* data */
import { me } from '@data';
/* material-ui */
import {
	Box,
	BoxProps,
	Container,
	Divider,
	Drawer,
	GlobalStyles,
	Stack,
	styled,
	Typography,
	useTheme,
} from '@mui/material';
import { SettingsContext } from '@settings';

import { AboutMe, Academics, Contact, Projects, Skills } from './portfolioBarrel';

const StyledBox = styled(Box, {
	shouldForwardProp: (prop) => prop !== 'disableMorphism',
})<BoxProps & { disableMorphism: boolean }>(({ theme, disableMorphism }) => {
	return {
		...theme.mixins.glassMorphism(theme, {
			noBorder: true,
			noBoxShadow: true,
			gradientBackground: false,
			disableMorphism,
		}),
		position: 'sticky',
		height: '100%',
		zIndex: 1000,
		top: 0,
		paddingLeft: 5,
		backgroundColor: disableMorphism ? theme.palette.background.default : 'none',
	};
});
const TocTabContext = createContext<null | any>(null);
const Portfolio = () => {
	const { toc, contact, aboutMe, academics, skills, projects } = me;
	const [open, setOpen] = useState(false); // drawer
	const theme = useTheme();
	const { disableMorphism } = useContext(SettingsContext);

	const [activeProjectTab, setActiveProjectTab] = useState(0);
	const [activeAcademicTab, setActiveAcademicTab] = useState(0);

	function toggleDrawer(): void {
		setOpen(!open);
	}

	function onTocSelect(id: string): void {
		setOpen(false);
		let [section, elementId] = id.split('_'); // Use a different variable for the element ID
		if (section === 'projects') {
			setActiveProjectTab(parseInt(elementId));
		} else if (section === 'academic-history') {
			setActiveAcademicTab(parseInt(elementId));
		}
		document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'end' });
	}

	function TOCWrapper(): JSX.Element {
		return <TOC toc={toc} onSelect={onTocSelect} />;
	}

	useEffect(() => {
		document.title = `${aboutMe.name} | Portfolio`;
	}, []);

	return (
		<>
			<GlobalStyles styles={{ body: theme.mixins.customScrollbar }} />
			<Appbar open={open} onMenuClick={toggleDrawer} />
			<Container sx={{ paddingTop: `${theme.appBarHeight}px` }}>
				<AboutMe aboutMe={aboutMe} />
				<StyledBox disableMorphism={disableMorphism}>
					<Box
						sx={{
							position: 'relative',
							width: '100%',
							height: theme.appBarHeight * 2.2,
							display: 'flex',
							alignItems: 'flex-end',
						}}>
						<Typography variant="h3" marginTop={5} gutterBottom>
							Portfolio
						</Typography>
					</Box>
					<Divider />
				</StyledBox>
				<Stack spacing={{ xs: 2, md: 5 }}>
					<TocTabContext.Provider value={{ activeProjectTab, activeAcademicTab }}>
						<Contact contact={contact} />
						<Academics academics={academics} />
						<Skills skills={skills} />
						<Projects projects={projects} />
					</TocTabContext.Provider>
				</Stack>
			</Container>
			<Drawer open={open} onClose={toggleDrawer}>
				<Box paddingTop={`${theme.appBarHeight}px`}>
					<TOCWrapper />
				</Box>
			</Drawer>
		</>
	);
};

export { Portfolio, TocTabContext };
