import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { ReactNode, useContext, useEffect, useRef, useState } from 'react';

import { CustomIcon } from '@barrel';
import { Box, IconButton, Pagination, Stack } from '@mui/material';
import { SettingsContext } from '@settings';
import { Dimension } from '@types';

interface CustomCarouselProps {
	list: {
		content: ReactNode;
		customPaginationComponent?: HTMLOrSVGImageElement;
	}[];
	height?: Dimension;
	width?: Dimension;
	pagination?: boolean;
	initialIndex?: number;
	sideArrows?: boolean;
	heightUpdateDependency?: any;
}

const variants = {
	enter: (direction: number) => ({
		x: direction > 0 ? 1000 : -1000,
		opacity: 0,
	}),
	center: {
		zIndex: 1,
		x: 0,
		opacity: 1,
	},
	exit: (direction: number) => ({
		zIndex: 0,
		x: direction < 0 ? 1000 : -1000,
		opacity: 0,
	}),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
	return Math.abs(offset) * velocity;
};

const MotionBox = motion(Box);

const CustomCarousel = ({
	list,
	initialIndex = 0,
	pagination = false,
	sideArrows = false,
	height = 'auto',
	width = '100%',
	heightUpdateDependency = null,
}: CustomCarouselProps): JSX.Element => {
	const [[page, direction], setPage] = useState([initialIndex, 0]);
	const childRef = useRef<HTMLDivElement>(null);
	const [autoHeight, setAutoHeight] = useState<number>(0);
	const { disableAnimations } = useContext(SettingsContext);

	useEffect(() => {
		if (childRef.current && height === 'auto') {
			setAutoHeight(childRef.current.scrollHeight);
		}
	}, [page, childRef.current, heightUpdateDependency]);

	const paginate = (newPage: number) => {
		if (newPage >= 0 && newPage < list.length) {
			const newDirection = newPage > page ? 1 : -1;
			setPage([newPage, newDirection]);
		}
	};

	const handleDragEnd: any = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
		const { offset, velocity } = info;
		const swipe = swipePower(offset.x, velocity.x);
		if (swipe < -swipeConfidenceThreshold) {
			paginate(page + 1);
		} else if (swipe > swipeConfidenceThreshold) {
			paginate(page - 1);
		}
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
			}}>
			{sideArrows && (
				<IconButton onClick={() => paginate(page - 1)}>
					<CustomIcon style={{ aspectRatio: 1 }} icon={['fas', 'angle-left']} />
				</IconButton>
			)}
			<Stack sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }} useFlexGap>
				<Box
					ref={childRef}
					sx={{
						height: height === 'auto' ? autoHeight : height,
						width,
						position: 'relative',
						overflow: 'hidden',
					}}>
					<AnimatePresence initial={false} custom={direction}>
						<MotionBox
							key={page}
							custom={direction}
							variants={!disableAnimations ? variants : {}}
							initial="enter"
							animate="center"
							exit="exit"
							transition={{
								x: { type: 'spring', stiffness: 260, damping: 20 },
								opacity: { duration: 0.2 },
							}}
							drag="x"
							dragConstraints={{ left: 0, right: 0 }}
							dragElastic={1}
							onDragEnd={handleDragEnd}
							sx={{
								position: 'absolute',
								height: '100%',
								width: '100%',
							}}>
							<div style={{ width: '100%', display: 'inline-block' }}>{list[page].content}</div>
						</MotionBox>
					</AnimatePresence>
				</Box>
				{pagination && (
					<Pagination
						count={list.length}
						page={page + 1}
						onChange={(_, value) => paginate(value - 1)}
						color="primary"
						sx={{ paddingY: 2 }}
					/>
				)}
			</Stack>
			{sideArrows && (
				<IconButton onClick={() => paginate(page + 1)}>
					<CustomIcon style={{ aspectRatio: 1 }} icon={['fas', 'angle-right']} />
				</IconButton>
			)}
		</Box>
	);
};

export { CustomCarousel };
