import { AnimatePresence, m, PanInfo } from 'framer-motion';
import { ReactNode, useContext, useEffect, useState } from 'react';

import { Box } from '@mui/material';
import { SettingsContext } from '@settings';
import { Dimension } from '@types';

import { PaginationWrapper } from './PaginationWrapper';
import { SideArrowsWrapper } from './SideArrowsWrapper';

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

const MotionBox = m(Box);

const CustomCarousel = ({
	list,
	initialIndex = 0,
	pagination = false,
	sideArrows = false,
	activeIndex = 0,
	stopDrag = false,
	paginationPosition = 'bottom',
}: CustomCarouselProps): JSX.Element => {
	const [[page, direction], setPage] = useState([initialIndex, 0]);
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

	return (
		<SideArrowsWrapper
			sideArrows={sideArrows}
			onGoBack={() => paginate(page - 1)}
			onGoNext={() => paginate(page + 1)}>
			<PaginationWrapper
				pagination={pagination}
				position={paginationPosition}
				count={list.length}
				page={page + 1}
				onChange={(_, page) => paginate(page - 1)}>
				<div style={{ overflow: 'hidden' }}>
					<AnimatePresence initial={false} custom={direction} presenceAffectsLayout mode="popLayout">
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
								height: '100%',
								width: '100%',
							}}>
							{list[page].content}
						</MotionBox>
					</AnimatePresence>
				</div>
			</PaginationWrapper>
		</SideArrowsWrapper>
	);
};

export { CustomCarousel };
