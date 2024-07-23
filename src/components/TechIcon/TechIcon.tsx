import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

import { CustomEdge, CustomPopover, InfoCard } from '@barrel';
import { Box, Theme, useMediaQuery } from '@mui/material';
import { SkillDetails } from '@types';

import { Icon } from './Icon';

interface TechIconProps {
	icon: SkillDetails | SkillDetails[];
	label?: string;
	duration?: number; // in milliseconds
}

const MotionIcon = motion(Icon);

const TechIcon = (props: TechIconProps) => {
	const { icon, label, duration = 2000 } = props;

	if (Array.isArray(icon)) {
		const [active, setActive] = useState<number>(0);
		const [hovering, setHovering] = useState<boolean>(false);
		const [mounted, setMounted] = useState<boolean>(false);

		useEffect(() => {
			setMounted(true);
		}, []);

		useEffect(() => {
			const timeout = setTimeout(() => {
				if (!hovering) {
					setActive((prev) => (prev + 1) % icon.length);
				}
			}, duration + 200);
			return () => clearTimeout(timeout);
		}, [active, hovering, icon.length, duration]);

		return (
			<Wrapper content={<InfoCard skills={icon} active={active} />}>
				<Box sx={{ position: 'relative', width: 175, height: 175 }}>
					<AnimatePresence>
						<MotionIcon
							label={icon[active].name}
							icon={icon[active]}
							key={icon[active].name}
							initial={{ opacity: mounted ? 0 : 1 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: duration / 2000, delay: duration / 4000 }}
							onHoverStart={() => setHovering(true)}
							onHoverEnd={() => setHovering(false)}
							sx={{
								position: 'absolute',
								height: '100%',
								width: '100%',
							}}
						/>
					</AnimatePresence>
				</Box>
			</Wrapper>
		);
	}

	return (
		<Wrapper content={<InfoCard skills={icon} />}>
			<Box sx={{ position: 'relative', width: 175, height: 175 }}>
				<Icon label={label || icon.name} icon={icon} />
			</Box>
		</Wrapper>
	);
};

const Wrapper = ({ children, content }: { children: ReactNode; content: JSX.Element }) => {
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

	if (!isMobile) {
		return (
			<CustomPopover content={content} noBackground>
				{children}
			</CustomPopover>
		);
	} else {
		return <CustomEdge content={content}>{children}</CustomEdge>;
	}
};

export { TechIcon };
