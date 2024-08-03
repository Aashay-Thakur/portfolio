import { useContext, useEffect, useRef, useState } from 'react';

import { CustomCarousel } from '@barrel';
import { Box, BoxProps, styled } from '@mui/material';
import { SettingsContext } from '@settings';
import { ColorBlindMode, SizeDimensions, SkillDetails } from '@types';

import { InfoCardContent } from './InfoCardContent';

const StyledCard = styled(Box, {
	shouldForwardProp: (prop) => prop !== 'colorBlindMode',
})<BoxProps & { colorBlindMode: ColorBlindMode }>(({ theme, colorBlindMode }) => {
	if (colorBlindMode === 'achromatopsia') {
		return {
			backgroundColor: theme.palette.secondary.main,
			color: theme.palette.primary.contrastText,
		};
	}

	if (colorBlindMode === 'protanopia') {
		return {
			backgroundColor: theme.palette.error.main,
			color: theme.palette.error.contrastText,
		};
	}

	if (colorBlindMode === 'deuteranopia') {
		return {
			backgroundColor: theme.palette.warning.main,
			color: theme.palette.warning.contrastText,
		};
	}

	if (colorBlindMode === 'tritanopia') {
		return {
			backgroundColor: theme.palette.info.main,
			color: theme.palette.info.contrastText,
		};
	}

	return {
		...theme.mixins.glassMorphism(theme, {
			noBorder: true,
			noBoxShadow: true,
			gradientOpacity: 0.65,
		}),
	};
});

const InfoCard = ({ skills, active = 0 }: { skills: SkillDetails | SkillDetails[]; active?: number }) => {
	const [dimensions, setDimensions] = useState<SizeDimensions>({ height: 400, width: 350 });
	const cardRef = useRef<HTMLDivElement | null>(null);
	const { colorBlindMode } = useContext(SettingsContext);

	useEffect(() => {
		if (cardRef.current) {
			setDimensions({
				height: cardRef.current.clientHeight,
				width: cardRef.current.clientWidth,
			});
		}
	}, []);

	if (Array.isArray(skills)) {
		const list = skills.map((skill) => {
			const ref = useRef<HTMLDivElement>(null);
			return { content: <InfoCardContent ref={ref} skill={skill} /> };
		});
		return (
			<StyledCard colorBlindMode={colorBlindMode}>
				<CustomCarousel initialIndex={active} {...dimensions} list={list} pagination />
			</StyledCard>
		);
	}

	return (
		<StyledCard colorBlindMode={colorBlindMode}>
			<InfoCardContent ref={cardRef} skill={skills} />
		</StyledCard>
	);
};

export { InfoCard };
