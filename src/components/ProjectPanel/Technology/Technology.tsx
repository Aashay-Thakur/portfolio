import { AnimatePresence, motion, MotionProps } from 'framer-motion';
import { ReactNode, SyntheticEvent, useState } from 'react';

import { Box, Grid, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material';
import { SkillDetails } from '@types';

interface TechnologyProps {
	stack: (SkillDetails & { description: string })[];
}

interface MotionIconButtonProps extends MotionProps {
	children: ReactNode;
}

const AppearAnimationWrapper = ({ children, ...motionProps }: MotionIconButtonProps) => {
	return (
		<AnimatePresence>
			<motion.div
				initial={{ y: 10, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: 10, opacity: 0 }}
				{...motionProps}>
				{children}
			</motion.div>
		</AnimatePresence>
	);
};

const Technology = ({ stack }: TechnologyProps) => {
	const [active, setActive] = useState<number>(0);
	const theme = useTheme();
	const isXs = useMediaQuery(theme.breakpoints.down('sm'));

	const handleOnChange = (_: SyntheticEvent, newValue: number) => {
		setActive(newValue);
	};

	return (
		<Grid
			spacing={{ xs: 5, sm: 3, md: 5 }}
			container
			sx={{
				padding: { xs: 1, md: 5 },
				height: '100%',
				width: '100%',
			}}>
			<Grid xs={12} sm={2} item>
				<Tabs
					sx={{
						width: '100%',
						height: '100%',
					}}
					orientation={isXs ? 'horizontal' : 'vertical'}
					variant="scrollable"
					scrollButtons={false}
					value={active}
					onChange={handleOnChange}
					centered>
					{stack.map((item, index) => (
						<Tab
							key={`tab_${index}`}
							component="div"
							onClick={() => setActive(index)}
							icon={<img src={item.src} height={30} width={30} />}
						/>
					))}
				</Tabs>
			</Grid>
			<Grid xs={12} sm={10} item container>
				<Grid xs={12} item>
					<Box sx={{ display: 'grid', placeItems: 'center' }}>
						<AppearAnimationWrapper key={`img_${active}`} transition={{ duration: 0.3 }}>
							<Box sx={{ height: 300, width: '100%' }}>
								<img src={stack[active].src} height="100%" width="100%" />
							</Box>
						</AppearAnimationWrapper>
					</Box>
				</Grid>
				<Grid xs={12} item>
					<AppearAnimationWrapper key={`name_${active}`} transition={{ duration: 0.3, delay: 0.1 }}>
						<Typography variant="h5" gutterBottom>
							{stack[active].name}
						</Typography>
					</AppearAnimationWrapper>
				</Grid>
				<Grid xs={12} minHeight={200} item>
					<AppearAnimationWrapper key={`description_${active}`} transition={{ duration: 0.3, delay: 0.2 }}>
						<Typography variant="body2">{stack[active].description}</Typography>
					</AppearAnimationWrapper>
				</Grid>
			</Grid>
		</Grid>
	);
};

export { Technology };
