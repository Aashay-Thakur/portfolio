import { ReactNode, useCallback, useRef, useState } from 'react';

import { Box, Fade, Popper, PopperProps, styled } from '@mui/material';

interface CustomPopperProps extends Omit<PopperProps, 'open' | 'anchorEl' | 'id' | 'transition'> {
	children: ReactNode;
	message: string;
}

const StyledBox = styled(Box)(({ theme }) => ({
	padding: theme.spacing(1),
	background: theme.mixins.linearGradient(theme, { opacity: 1 }),
	color: theme.palette.getContrastText(theme.palette.primary.main),
	maxWidth: 200,
}));

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
							<StyledBox>{message}</StyledBox>
						</Fade>
					)}
				</Popper>
			)}
		</div>
	);
}

export { CustomPopup };
