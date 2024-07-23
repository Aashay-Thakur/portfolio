import { ReactNode, useCallback, useRef, useState } from 'react';

import { Box, Fade, Popper, PopperProps } from '@mui/material';

interface CustomPopperProps extends Omit<PopperProps, 'open' | 'anchorEl' | 'id' | 'transition'> {
	children: ReactNode;
	message: string;
}
function CustomPopup({ children, message, ...popperProps }: CustomPopperProps) {
	const [open, setOpen] = useState(false);
	const anchorRef = useRef<HTMLDivElement>(null);

	const handleMouseEnter = useCallback(() => setOpen(true), []);
	const handleMouseLeave = useCallback(() => setOpen(false), []);

	return (
		<div>
			<div ref={anchorRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
				{children}
			</div>
			{open && (
				<Popper
					id={open ? 'transition-popper' : undefined}
					open={open}
					anchorEl={anchorRef.current}
					transition
					sx={{ background: 'background.paper', zIndex: 9999 }}
					{...popperProps}>
					{({ TransitionProps }) => (
						<Fade {...TransitionProps} timeout={350}>
							<Box sx={{ p: 1, bgcolor: 'background.paper', maxWidth: 200, outline: 1 }}>{message}</Box>
						</Fade>
					)}
				</Popper>
			)}
		</div>
	);
}

export { CustomPopup };
