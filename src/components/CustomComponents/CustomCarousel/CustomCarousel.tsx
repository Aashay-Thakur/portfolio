import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import { ReactNode, useContext, useEffect, useRef, useState } from 'react';

import { ArrowBackIosNewSharp, ArrowForwardIosSharp } from '@mui/icons-material';
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
	activeIndex?: number;
	stopDrag?: boolean;
	paginationPosition?: 'top' | 'bottom';
}

const variants = {
	enter: (direction: number) => ({
		x: direction > 0 ? '100%' : '-100%',
		opacity: 0,
	}),
	center: {
		zIndex: 1,
		x: 0,
		opacity: 1,
	},
	exit: (direction: number) => ({
		zIndex: 0,
		x: direction < 0 ? '100%' : '-100%',
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
	activeIndex = 0,
	stopDrag = false,
	paginationPosition = 'bottom',
}: CustomCarouselProps): JSX.Element => {
	const [[page, direction], setPage] = useState([initialIndex, 0]);
	const childRef = useRef<HTMLDivElement>(null);
	const [autoHeight, setAutoHeight] = useState<number>(0);
	const { disableAnimations } = useContext(SettingsContext);

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

	useEffect(() => {
		paginate(activeIndex);
	}, [activeIndex]);

	useEffect(() => {
		if (childRef.current && height === 'auto') {
			setAutoHeight(childRef.current.scrollHeight);
		}
	}, [page, childRef.current, heightUpdateDependency]);

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
					<ArrowBackIosNewSharp />
				</IconButton>
			)}
			<Stack
				sx={{
					width: '100%',
					height: '100%',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: paginationPosition === 'top' ? 'column-reverse' : 'column',
				}}
				useFlexGap>
				<Box
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
							drag={stopDrag ? false : 'x'}
							dragConstraints={{ left: 0, right: 0 }}
							dragElastic={1}
							onDragEnd={handleDragEnd}
							sx={{
								position: 'absolute',
								height: '100%',
								width: '100%',
							}}>
							<Box ref={childRef} sx={{ width: '100%', display: 'inline-block' }}>
								{list[page].content}
							</Box>
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
					<ArrowForwardIosSharp />
				</IconButton>
			)}
		</Box>
	);
};

export { CustomCarousel };
