import './App.css';

import { createContext, RefObject, useRef, useState } from 'react';

import { BasicSpeedDial, CustomModal, Portfolio, SettingsModal } from '@barrel';
import { Box, CssBaseline } from '@mui/material';

const PortalContext = createContext<RefObject<HTMLDivElement> | null>(null);
function App(): JSX.Element {
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const portalRef = useRef<HTMLDivElement>(null);

	return (
		<>
			<CssBaseline />
			<PortalContext.Provider value={portalRef}>
				<Portfolio />
			</PortalContext.Provider>
			<Box
				sx={{
					position: 'fixed',
					top: 0,
					left: 0,
				}}
				ref={portalRef}
			/>
			<BasicSpeedDial settingsModalOnOpen={handleOpen} />
			<CustomModal open={open} onClose={handleClose}>
				<SettingsModal />
			</CustomModal>
		</>
	);
}

export default App;
export { PortalContext };
