import { CSSProperties, ReactElement, SVGProps } from 'react';

import { FunctionInterpolation } from '@emotion/react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
	CSSInterpolation,
	CSSObject,
	Interpolation,
	PaletteMode,
	PopoverProps,
	Theme as ThemeType,
} from '@mui/material';
import { MixinsOptions } from '@mui/material/styles/createMixins';
import { Skill, SkillMap, SkillName } from '@techMap';
import { FeatureList } from '@types';

/* Data Types */
interface SkillDetails {
	name: string;
	icon: `/src/assets/icons/${string}`;
	link: string;
	wikiTopic: string;
	wikiLink: `https://en.wikipedia.org/wiki/${string}`;
	key: SkillName;
	svgSprite?: `${string}#${SkillName}`;
}

interface SkillCategories {
	[category: string]: {
		[skill: string]: SkillDetails | SkillDetails[];
	};
}

/* Settings Types */
type ColorBlindMode = 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia' | 'none';

interface AppSettings {
	disableAnimations: boolean;
	disableDarkMode: boolean;
	enableDyslexicFont: boolean;
	colorBlindMode: ColorBlindMode;
	themeMode: PaletteMode;
	enableBoldText: boolean;
	disableMorphism: boolean;
}

interface SettingsContext extends AppSettings {
	toggleDisableAnimations: () => void;
	toggleDisableDarkMode: () => void;
	toggleDyslexicFont: () => void;
	setColorBlindMode: (mode: ColorBlindMode) => void;
	toggleThemeMode: (mode?: PaletteMode) => void;
	toggleBoldText: () => void;
	toggleMorphism: () => void;
}

interface AboutMe {
	name: string;
	age: number;
	bio: { text: string; keyPhrases?: string[] };
	initials: string;
	id: string;
	picture?: string;
}

interface ContactInfo {
	name: string;
	phone: string;
	address: string;
	socials: SocialLink[];
	id: string;
	age: number;
}

interface ProjectDetails {
	title: string;
	description: string;
	links: {
		repo: string;
		website?: string;
	};
	techStack: SkillDetails[];
	features?: FeaturesType;
}

/* Education Types */
interface EducationDetails {
	degree: DegreeDetails;
	grade: GradeDetails;
	status: string;
	institute: InstituteDetails;
	duration: number | undefined; // in years
	endYear: number;
}

interface GradeDetails {
	grade: number | string | undefined;
	type: GradeType;
	outOf: number | string | undefined;
}

/* Contact Types */
interface SocialLink {
	icon: IconProp;
	link: string;
	text: string;
}

interface TableOfContents {
	[key: string]: {
		id: string;
		list?: {
			name: string;
			id: string;
		}[];
	};
}

/* Skills Types */
interface SizeDimensions {
	height: string | number;
	width: string | number;
}

interface GlassMorphismProps {
	noBorder?: boolean;
	noBoxShadow?: boolean;
	gradientBackground?: boolean;
	gradientOpacity?: number;
	gradientDirection?: string;
	disableMorphism?: boolean;
}

interface LinearGradientProps {
	primary?: string;
	secondary?: string;
	opacity?: number;
	direction?: string;
}

/* Project types */

type FeatureArrow = '>' | '<' | '<>' | '->' | '<-' | '<->';
type FeatureIcon = {
	label: 'Admin' | 'Client' | 'Server' | 'Network' | 'Database';
	message?: string;
};
type FeatureList = Array<FeatureArrow | FeatureIcon>;
type FeaturesType = Record<string, FeatureList> | FeatureList;

/* Theme Types */
declare module '@mui/material/styles' {
	interface Theme {
		appBarHeight: number;
	}
	interface ThemeOptions {
		appBarHeight?: number;
	}
	interface Mixins {
		customScrollbar: {
			[key: `&::-webkit-scrollbar${string}`]: CSSProperties;
		};
		glassMorphism: (theme: ThemeType, props?: GlassMorphismProps) => CSSObject;
		linearGradient: (theme: ThemeType, props?: LinearGradientProps) => string;
	}
}
