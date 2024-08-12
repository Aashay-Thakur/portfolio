import { useContext, useRef } from 'react';
import { createRoot, Root } from 'react-dom/client';

import { PortalContext } from '@root/App';

import Prompt from './Modals/Prompt';

export const usePrompt = () => {
	const portalRef = useContext(PortalContext);
	const rootRef = useRef<Root | null>(null);

	const modalPrompt = (message: string): Promise<string> => {
		if (!portalRef?.current) {
			// Fallback to window.alert if portalRef is null
			return Promise.resolve(window.prompt(message) || '');
		}

		return new Promise<string>((resolve) => {
			if (!rootRef.current && portalRef.current) {
				rootRef.current = createRoot(portalRef.current);
			}

			if (rootRef.current) {
				rootRef.current.render(
					<Prompt
						message={message}
						onClose={(response: string) => {
							closePrompt();
							resolve(response);
						}}
					/>,
				);
			} else {
				// Fallback to window.alert if rootRef is null or not initialized
				resolve(window.prompt(message) || '');
			}
		});
	};

	const closePrompt = () => {
		if (rootRef.current) {
			// Unmount the prompt component and clean up the root
			rootRef.current.unmount();
			rootRef.current = null;
		}
	};

	return modalPrompt;
};
