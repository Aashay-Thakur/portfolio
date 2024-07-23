import { stagger, useAnimate } from 'framer-motion';
import { useEffect } from 'react';

import { MotionArrow } from '@assets/MotionArrow/MotionArrow';
import { ToAndFro } from '@assets/MotionArrow/ToAndFro';
import { CustomIcon, CustomPopup } from '@barrel';
import { Box, styled, Typography } from '@mui/material';
import { FeatureArrow, FeatureIcon, FeatureList } from '@types';

const StyledBox = styled(Box)({
	'flexGrow': 1,
	'display': 'flex',
	'flexDirection': 'column',
	'justifyContent': 'center',
	'alignItems': 'center',
	'marginTop': 4,
	'transition': 'transform 0.3s',
	'cursor': 'pointer',
	'& .icon-container': {
		transition: 'transform 0.3s',
	},
	'&:hover .icon-container': {
		transform: 'translateY(-10px)',
	},
});

const Animation = ({ list }: { list: FeatureList }) => {
	if (list.length === 0) {
		return null;
	}

	const [scope, animate] = useAnimate();

	useEffect(() => {
		animate(
			scope.current.children,
			{ opacity: [0, 1], y: [20, 0] },
			{ duration: 0.3, delay: stagger(0.1, { from: 'center' }) },
		);
	}, []);

	const getElement = (item: FeatureIcon['label'] | FeatureArrow, index: number) => {
		switch (item) {
			case 'Admin':
				return <CustomIcon key={`anim_${index}`} fontSize="inherit" icon={['fas', 'desktop']} />;
			case 'Client':
				return <CustomIcon key={`anim_${index}`} fontSize="inherit" icon={['fas', 'computer']} />;
			case 'Server':
				return <CustomIcon key={`anim_${index}`} fontSize="inherit" icon={['fas', 'server']} />;
			case 'Network':
				return <CustomIcon key={`anim_${index}`} fontSize="inherit" icon={['fas', 'network-wired']} />;
			case 'Database':
				return <CustomIcon key={`anim_${index}`} fontSize="inherit" icon={['fas', 'database']} />;
			case '>':
				return <MotionArrow key={`anim_${index}`} />;
			case '<':
				return <MotionArrow key={`anim_${index}`} rotation={180} />;
			case '<>':
				return <ToAndFro key={`anim_${index}`} arrowTip />;
			case '->':
				return <MotionArrow key={`anim_${index}`} still />;
			case '<-':
				return <MotionArrow key={`anim_${index}`} rotation={180} still />;
			case '<->':
				return <ToAndFro key={`anim_${index}`} arrowTip still />;
		}
	};
	return (
		<Box
			ref={scope}
			sx={{
				display: 'flex',
				flexDirection: 'row',
				width: '100%',
				height: '100%',
				justifyContent: 'space-between',
				alignItems: 'center',
				gap: { xs: 2, md: 3 },
			}}>
			{list.map((item: FeatureList[0], index: number) => {
				const arrowFlag = typeof item === 'string';

				if (arrowFlag) {
					return getElement(item, index);
				}

				return (
					<CustomPopup key={`anim_${index}_popup`} message={item.message || item.label}>
						<StyledBox key={`anim_${index}_box`}>
							<Box
								sx={{
									fontSize: { xs: 32, sm: 38, md: 48 },
								}}
								className="icon-container"
								key={`anim_${index}`}>
								{getElement(item.label, index)}
							</Box>
							<Typography variant="body2">{item.label}</Typography>
						</StyledBox>
					</CustomPopup>
				);
			})}
		</Box>
	);
};

export { Animation };
