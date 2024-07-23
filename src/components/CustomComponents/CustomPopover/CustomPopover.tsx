import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Box, Popover, PopoverOrigin, PopoverProps } from '@mui/material';
import { getSectionPosition } from '@utils/helper';

interface CustomPopoverProps extends Omit<PopoverProps, 'open' | 'content'> {
	children: ReactNode;
	content: ReactNode | string;
	noBackground?: boolean; // disables paper background on child container
}

interface Origin {
	anchorOrigin: PopoverOrigin;
	transformOrigin: PopoverOrigin;
}

const CustomPopover = (props: CustomPopoverProps) => {
	const { children, content, noBackground = false, ...rest } = props;
	const ref = useRef<HTMLDivElement>(null);
	const popoverRef = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
	const [origin, setOrigin] = useState<Origin>({
		anchorOrigin: { vertical: 'top', horizontal: 'right' },
		transformOrigin: { vertical: 'bottom', horizontal: 'left' },
	});

	useEffect(() => {
		if (ref.current) {
			setAnchorEl(ref.current);
		}
	}, [ref]);

	/**
	 * Calculates where the popover should open and from what corner relative to the anchor elem,
	 * based on the anchor elem's position on the viewport.
	 */
	useLayoutEffect(() => {
		if (anchorEl && open) {
			const rect = anchorEl.getBoundingClientRect();

			const verticalSection = getSectionPosition(rect.top + rect.height / 2, window.innerHeight, 3) || 1;
			const horizontalSection = getSectionPosition(rect.left + rect.width / 2, window.innerWidth, 3) || 1;

			const anchorVerticalOptions = ['bottom', 'center', 'top'];
			const anchorHorizontalOptions = ['right', 'center', 'left'];

			const anchorVertical = anchorVerticalOptions[verticalSection] as 'center' | 'top' | 'bottom';
			const anchorHorizontal = anchorHorizontalOptions[horizontalSection] as 'left' | 'center' | 'right';

			const anchorOrigin: PopoverOrigin = {
				vertical: anchorVertical,
				horizontal: anchorHorizontal,
			};

			const transformOrigin: PopoverOrigin = {
				vertical: anchorVertical === 'center' ? 'center' : anchorVertical === 'top' ? 'bottom' : 'top',
				horizontal: anchorHorizontal === 'center' ? 'center' : anchorHorizontal === 'left' ? 'right' : 'left',
			};

			setOrigin({ anchorOrigin, transformOrigin });
		}
	}, [open, anchorEl]);

	return (
		<>
			<Box ref={ref} onClick={() => setOpen(true)}>
				{children}
			</Box>
			{open && (
				<Popover
					id={open ? 'simple-popover' : undefined}
					open={open}
					anchorEl={anchorEl}
					onClose={() => setOpen(false)}
					disableScrollLock
					ref={popoverRef}
					anchorOrigin={origin.anchorOrigin}
					transformOrigin={origin.transformOrigin}
					slotProps={
						noBackground
							? {
									paper: {
										sx: {
											backgroundColor: 'transparent',
											boxShadow: 'none',
										},
									},
							  }
							: {}
					}
					{...rest}>
					{content}
				</Popover>
			)}
		</>
	);
};

export { CustomPopover };
