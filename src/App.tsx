import './App.css';

import { createContext, RefObject, useRef, useState } from 'react';

import { BasicSpeedDial, Resume, SettingsModal } from '@barrel';
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
				<Resume />
			</PortalContext.Provider>
			<Box
				sx={{
					position: 'fixed',
					bottom: 0,
					left: 0,
				}}
				ref={portalRef}
			/>
			<BasicSpeedDial settingsModalOnOpen={handleOpen} />
			<SettingsModal open={open} onClose={handleClose} />
		</>
	);
}

export default App;
export { PortalContext };
