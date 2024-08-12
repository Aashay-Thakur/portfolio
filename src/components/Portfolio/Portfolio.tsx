import { LazyMotion, m, useScroll, useSpring } from 'framer-motion';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { loadFeatures } from '@assets/loadFeatures';
import Logo from '@assets/Logo/Logo';
import { Appbar, ChatModal, CustomModal, Footer, LoadingPage, TOC } from '@barrel';
import { useFetchData } from '@hooks/useFetchData';
import { Box, BoxProps, Container, Drawer, GlobalStyles, Stack, styled, Typography, useTheme } from '@mui/material';
import { Person } from '@root/contexts/data/Person';
import { SettingsContext } from '@settings';

import { AboutMe, Academics, Contact, Projects, Skills } from './portfolioBarrel';

const StyledTypography = styled(Typography, {
	shouldForwardProp: (prop) => prop !== 'disableMorphism' && prop !== 'disableAnimations',
})<BoxProps & { disableMorphism: boolean; disableAnimations: boolean }>(
	({ theme, disableMorphism, disableAnimations }) => {
		return {
			...theme.mixins.glassMorphism(theme, {
				noBorder: true,
				noBoxShadow: true,
				gradientBackground: false,
				disableMorphism,
			}),
			position: disableAnimations ? 'relative' : 'sticky',
			height: '100%',
			zIndex: 1000,
			top: 0,
			paddingTop: theme.spacing(1),
			paddingBottom: theme.spacing(1),
			backgroundColor: disableMorphism ? theme.palette.background.default : 'none',
		};
	},
);

interface ActiveTabProps {
	activeAcademicTab: number;
	activeProjectTab: number;
}

const ActiveTab = createContext<ActiveTabProps>({ activeAcademicTab: 0, activeProjectTab: 0 });

const StyledMotionBox = styled(m(Box))(({ theme }) => ({
	height: 5,
	width: '100%',
	bottom: 0,
	position: 'absolute',
	background: theme.mixins.linearGradient(theme, { opacity: 0.5 }),
	transformOrigin: 'left',
}));

const Portfolio = () => {
	const { data, loading, error } = useFetchData();
	const theme = useTheme();
	const { disableMorphism, disableAnimations } = useContext(SettingsContext);

	const [open, setOpen] = useState(false); // drawer
	const [isChatOpen, setIsOpenChat] = useState(false); // gemini chat
	const [activeAcademicTab, setActiveAcademicTab] = useState<number>(0);
	const [activeProjectTab, setActiveProjectTab] = useState<number>(0);
	const [okToLoad, setOkToLoad] = useState(false);

	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
	const navigate = useNavigate();

	useEffect(() => {
		if (data?.aboutMe?.name) {
			document.title = `${data.aboutMe.name} | Portfolio`;
		}
	}, [data?.aboutMe?.name]);

	if (loading) return <LoadingPage onComplete={() => setOkToLoad(true)} />;
	if (!data && !okToLoad) {
		return (
			<Box>
				<Typography>No data found</Typography>;
			</Box>
		);
	}

	if (error) navigate('/error', { state: { error: { statusText: 'Error fetching data', status: 500 } } });

	const { toc, contact, aboutMe, academics, skills, projects, footerLinks } = data as Person;

	const toggleDrawer = () => setOpen(!open);
	const openChat = () => setIsOpenChat(true);
	const closeChat = () => setIsOpenChat(false);

	const onTocSelect = (id: string) => {
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
	};

	const TOCWrapper = () => <TOC toc={toc} onSelect={onTocSelect} />;

	return (
		<LazyMotion features={loadFeatures}>
			<GlobalStyles styles={{ body: theme.mixins.customScrollbar }} />
			<Appbar onGeminiChat={openChat} open={open} onMenuClick={toggleDrawer} />
			<Container sx={{ paddingTop: `${theme.appBarHeight}px` }}>
				<AboutMe aboutMe={aboutMe} />
				<StyledTypography
					disableAnimations={disableAnimations}
					disableMorphism={disableMorphism}
					variant="h3"
					marginTop={5}
					gutterBottom>
					Portfolio
					<StyledMotionBox style={{ scaleX: disableAnimations ? 1 : scaleX }} />
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
			<Footer footerLinks={footerLinks} />
			<CustomModal width="70vw" open={isChatOpen} onClose={closeChat}>
				<ChatModal name={aboutMe.name} />
			</CustomModal>
		</LazyMotion>
	);
};

export { Portfolio, ActiveTab };
