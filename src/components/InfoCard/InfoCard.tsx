import { useEffect, useRef, useState } from 'react';

import { CustomCarousel } from '@barrel';
import { Box, styled } from '@mui/material';
import { SizeDimensions, SkillDetails } from '@types';

import { InfoCardContent } from './InfoCardContent';

const StyledCard = styled(Box)(({ theme }) => ({
	...theme.mixins.glassMorphism(theme, {
		noBorder: true,
		noBoxShadow: true,
		gradientOpacity: 0.65,
	}),
}));

const InfoCard = ({ skills, active = 0 }: { skills: SkillDetails | SkillDetails[]; active?: number }) => {
	const [dimensions, setDimensions] = useState<SizeDimensions>({ height: 400, width: 350 });
	const cardRef = useRef<HTMLDivElement | null>(null);

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
			<StyledCard>
				<CustomCarousel initialIndex={active} {...dimensions} list={list} pagination />
			</StyledCard>
		);
	}

	return (
		<StyledCard>
			<InfoCardContent ref={cardRef} skill={skills} />
		</StyledCard>
	);
};

export { InfoCard };
