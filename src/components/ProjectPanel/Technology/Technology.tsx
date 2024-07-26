import { AnimatePresence, motion, MotionProps } from 'framer-motion';
import { ReactNode, useState } from 'react';

import { Box, Grid, IconButton, Stack, Typography } from '@mui/material';
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
				<Stack
					direction={{ xs: 'row', sm: 'column' }}
					spacing={1}
					sx={{
						borderRight: { xs: 0, sm: 1 },
						borderBottom: { xs: 1, sm: 0 },
						borderColor: 'divider',
						height: '100%',
						width: '100%',
						justifyContent: 'center',
						alignItems: 'center',
						padding: 1,
						scroll: 'auto',
						flexGrow: 1,
					}}
					useFlexGap>
					{stack.map((item, index) => {
						return (
							<AppearAnimationWrapper key={item.name} transition={{ duration: 0.3, delay: index * 0.1 }}>
								<IconButton
									onClick={() => setActive(index)}
									key={item.name}
									sx={{
										height: 50,
										width: 50,
									}}>
									<img alt={item.name} src={item.src} height="100%" width="100%" />
								</IconButton>
							</AppearAnimationWrapper>
						);
					})}
				</Stack>
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
