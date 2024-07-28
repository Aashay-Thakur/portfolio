import '@fontsource/lato/400.css';
import '@fontsource/lato/700.css';
import '@fontsource/opendyslexic/400.css';
import '@fontsource/opendyslexic/700.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ErrorPage } from '@barrel';
import { Settings } from '@settings';
import { Theme } from '@theme';

import App from './App.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Settings>
			<Theme>
				<RouterProvider router={router} />
			</Theme>
		</Settings>
	</React.StrictMode>,
);
