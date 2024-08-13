import { useContext, useRef } from 'react';
import { createRoot, Root } from 'react-dom/client';

import { ThemeProvider } from '@emotion/react';
import { useTheme } from '@mui/material';
import { PortalContext } from '@root/App';

import Alert from './Modals/Alert';

export const useAlert = () => {
	const portalRef = useContext(PortalContext);
	const rootRef = useRef<Root | null>(null);
	const theme = useTheme();

	const modalAlert = (message: string) => {
		if (!portalRef?.current) {
			// Fallback to window.alert if portalRef is null
			window.alert(message);
			return;
		}

		if (message === '') return closeAlert();

		if (!rootRef.current) {
			rootRef.current = createRoot(portalRef.current);
		}

		if (rootRef.current) {
			rootRef.current.render(
				<ThemeProvider theme={theme}>
					<Alert message={message} onClose={closeAlert} />
				</ThemeProvider>,
			);
		} else {
			// Fallback to window.alert if rootRef is null or not initialized
			window.alert(message);
		}
	};

	const closeAlert = () => {
		if (rootRef.current) {
			// Unmount the alert component and clean up the root
			rootRef.current.unmount();
			rootRef.current = null;
		}
	};

	return modalAlert;
};
