import { stagger, useAnimate } from 'framer-motion';
import { useContext, useEffect } from 'react';

import { MotionArrow } from '@assets/CustomIcons/MotionArrow';
import { ToAndFro } from '@assets/CustomIcons/ToAndFro';
import { CustomPopup } from '@barrel';
import {
	ComputerSharp,
	DesktopWindowsSharp,
	DnsSharp,
	RouterSharp,
	StorageSharp,
	TerminalSharp,
	WifiSharp,
} from '@mui/icons-material';
import { Box, styled, Typography } from '@mui/material';
import { SettingsContext } from '@settings';
import { FeatureArrow, FeatureIcon, FeatureList } from '@types';

const StyledBox = styled(Box, {
	shouldForwardProp(propName) {
		return propName !== 'disableAnimations';
	},
})<{ disableAnimations: boolean }>(({ disableAnimations }) => ({
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
		transform: !disableAnimations ? 'translateY(-10px)' : '',
	},
}));

const Animation = ({ list }: { list: FeatureList }) => {
	if (list.length === 0) {
		return null;
	}

	const [scope, animate] = useAnimate();
	const { disableAnimations } = useContext(SettingsContext);

	useEffect(() => {
		!disableAnimations &&
			animate(
				scope.current.children,
				{ opacity: [0, 1], y: [20, 0] },
				{ duration: 0.3, delay: stagger(0.1, { from: 'center' }) },
			);
	}, []);

	const getElement = (item: FeatureIcon['label'] | FeatureArrow, index: number) => {
		switch (item) {
			case 'Admin':
				return <ComputerSharp key={`admin_icon__{index}`} fontSize="inherit" />;
			case 'Client':
				return <DesktopWindowsSharp key={`client_icon__${index}`} fontSize="inherit" />;
			case 'Server':
				return <DnsSharp key={`server_icon__${index}`} fontSize="inherit" />;
			case 'Terminal':
				return <TerminalSharp key={`terminal_icon__${index}`} fontSize="inherit" />;
			case 'Network':
				return <RouterSharp key={`network_icon__${index}`} fontSize="inherit" />;
			case 'Database':
				return <StorageSharp key={`db_icon__${index}`} fontSize="inherit" />;
			case 'Internet':
				return <WifiSharp key={`web_icon__${index}`} fontSize="inherit" />;

			case '>':
				return <MotionArrow key={`right_icon__${index}`} />;
			case '<':
				return <MotionArrow key={`left_icon__${index}`} rotation={180} />;
			case '<>':
				return <ToAndFro key={`to_fro_icon__${index}`} arrowTip />;
			case '->':
				return <MotionArrow key={`still_right_icon__${index}`} still />;
			case '<-':
				return <MotionArrow key={`still_left_icon__${index}`} rotation={180} still />;
			case '<->':
				return <ToAndFro key={`still_to_fro_icon__${index}`} arrowTip still />;
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
						<StyledBox disableAnimations={disableAnimations} key={`anim_${index}_box`}>
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
