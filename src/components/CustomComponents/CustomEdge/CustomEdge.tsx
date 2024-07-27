import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Portal, SwipeableDrawer } from '@mui/material';
import { PortalContext } from '@root/App';

interface CustomEdgeProps {
	children: ReactNode;
	content: JSX.Element;
}

const CustomEdge: React.FC<CustomEdgeProps> = ({ children, content }) => {
	const [open, setOpen] = useState<boolean>(false);
	const portalRef = useContext(PortalContext);
	const navigate = useNavigate();
	const location = useLocation();
	const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

	const handleToggleDrawer = (newOpen: boolean) => () => {
		setOpen(newOpen);
	};

	useEffect(() => {
		const handlePopState = () => {
			if (open) {
				setOpen(false);
			}
		};

		window.addEventListener('popstate', handlePopState);

		return () => {
			window.removeEventListener('popstate', handlePopState);
		};
	}, [open]);

	useEffect(() => {
		if (open) {
			navigate(location.pathname, { replace: true });
		}
	}, [open, navigate, location.pathname]);

	return (
		<>
			<div onClick={() => setOpen(true)}>{children}</div>
			{portalRef && open && (
				<Portal container={portalRef.current}>
					<SwipeableDrawer
						disableBackdropTransition={!iOS}
						disableDiscovery={iOS}
						anchor="bottom"
						open={open}
						onClose={handleToggleDrawer(false)}
						onOpen={handleToggleDrawer(true)}
						disableSwipeToOpen={true}>
						<Box
							sx={{
								height: '100%',
								width: '100%',
								overflow: 'auto',
							}}>
							{content}
						</Box>
					</SwipeableDrawer>
				</Portal>
			)}
		</>
	);
};

export { CustomEdge };
