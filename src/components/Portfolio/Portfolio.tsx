/* react */
import { createContext, useContext, useEffect, useState } from 'react';

import Logo from '@assets/Logo/Logo';
/* components */
import { Appbar, TOC } from '@barrel';
/* data */
import { me } from '@data';
/* material-ui */
import { Box, BoxProps, Container, Drawer, GlobalStyles, Stack, styled, Typography, useTheme } from '@mui/material';
import { SettingsContext } from '@settings';

import { AboutMe, Academics, Contact, Projects, Skills } from './portfolioBarrel';

const StyledTypography = styled(Typography, {
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
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
		backgroundColor: disableMorphism ? theme.palette.background.default : 'none',
		borderBottom: `1px solid ${theme.palette.divider}`,
	};
});

interface ActiveTabProps {
	activeAcademicTab: number;
	activeProjectTab: number;
}

const ActiveTab = createContext<ActiveTabProps>({ activeAcademicTab: 0, activeProjectTab: 0 });

const Portfolio = () => {
	const { toc, contact, aboutMe, academics, skills, projects } = me;
	const [open, setOpen] = useState(false); // drawer
	const theme = useTheme();
	const { disableMorphism } = useContext(SettingsContext);

	const [activeAcademicTab, setActiveAcademicTab] = useState<number>(0);
	const [activeProjectTab, setActiveProjectTab] = useState<number>(0);

	function toggleDrawer(): void {
		setOpen(!open);
	}

	function onTocSelect(id: string): void {
		setOpen(false);
		const [section, index] = id.split('_');
		const element = document.getElementById(section);
		if (element) {
			if (section === 'projects') {
				setActiveProjectTab(Number(index));
			}
			if (section === 'academic-history') {
				setActiveAcademicTab(Number(index));
			}

			element.scrollIntoView({ behavior: 'smooth', block: 'end' });
		}
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
				<StyledTypography disableMorphism={disableMorphism} variant="h3" marginTop={5} gutterBottom>
					Portfolio
				</StyledTypography>
				<Stack spacing={{ xs: 2, md: 5 }}>
					<ActiveTab.Provider value={{ activeAcademicTab, activeProjectTab }}>
						<Contact contact={contact} />
						<Academics academics={academics} />
						<Skills skills={skills} />
						<Projects projects={projects} />
					</ActiveTab.Provider>
				</Stack>
			</Container>
			<Drawer open={open} onClose={toggleDrawer}>
				<Box paddingTop={`${theme.appBarHeight}px`}>
					<Box
						sx={{
							display: 'grid',
							placeItems: 'center',
							padding: 5,
							height: 150,
						}}>
						<Logo />
					</Box>
					<TOCWrapper />
				</Box>
			</Drawer>
		</>
	);
};

export { Portfolio, ActiveTab };
