import { createContext, ReactNode, useCallback, useEffect, useState } from 'react';

import { PaletteMode } from '@mui/material';
import { AppSettings, SettingsContext as SettingsContextType } from '@types';

function defaultSettings(save: boolean = false): AppSettings {
	const defaultSettings: AppSettings = {
		disableAnimations: window.matchMedia('(prefers-reduced-motion: reduce)').matches !== false,
		disableDarkMode: false,
		enableDyslexicFont: false,
		colorBlindMode: 'none',
		themeMode: window.matchMedia('(prefers-color-scheme: dark)').matches === false ? 'light' : 'dark',
		enableBoldText: false,
		disableMorphism: false,
	};

	if (save) {
		localStorage.setItem('settings', JSON.stringify(defaultSettings));
	}

	return defaultSettings;
}

function checkLocalStorage(): AppSettings {
	const storedSettings = localStorage.getItem('settings');

	if (storedSettings) {
		return JSON.parse(storedSettings);
	}

	return defaultSettings(true);
}

const SettingsContext = createContext<SettingsContextType>({
	...defaultSettings(false),
	toggleDisableAnimations: () => {},
	toggleDisableDarkMode: () => {},
	toggleDyslexicFont: () => {},
	setColorBlindMode: () => {},
	toggleThemeMode: () => {},
	toggleBoldText: () => {},
	toggleMorphism: () => {},
});

const Settings = ({ children }: { children: ReactNode }) => {
	const [settings, setSettings] = useState<AppSettings>(checkLocalStorage());

	const toggleDisableAnimations = useCallback(() => {
		setSettings((prevSettings) => ({ ...prevSettings, disableAnimations: !prevSettings.disableAnimations }));
	}, []);

	const toggleDisableDarkMode = useCallback(() => {
		setSettings((prevSettings) => ({
			...prevSettings,
			disableDarkMode: !prevSettings.disableDarkMode,
			themeMode: 'light',
		}));
	}, []);

	const toggleDyslexicFont = useCallback(() => {
		setSettings((prevSettings) => ({ ...prevSettings, enableDyslexicFont: !prevSettings.enableDyslexicFont }));
	}, []);

	const setColorBlindMode = useCallback((colorBlindMode: AppSettings['colorBlindMode']) => {
		setSettings((prevSettings) => ({ ...prevSettings, colorBlindMode }));
	}, []);

	const toggleThemeMode = useCallback((mode?: PaletteMode) => {
		setSettings((prevSettings) => ({
			...prevSettings,
			themeMode: mode || prevSettings.themeMode === 'light' ? 'dark' : 'light',
		}));
	}, []);

	const toggleBoldText = useCallback(() => {
		setSettings((prevSettings) => ({ ...prevSettings, enableBoldText: !prevSettings.enableBoldText }));
	}, []);

	const toggleMorphism = useCallback(() => {
		setSettings((prevSettings) => ({ ...prevSettings, disableMorphism: !prevSettings.disableMorphism }));
	}, []);

	useEffect(() => {
		localStorage.setItem('settings', JSON.stringify(settings));
	}, [settings]);

	return (
		<SettingsContext.Provider
			value={{
				...settings,
				toggleDisableAnimations,
				toggleDisableDarkMode,
				toggleDyslexicFont,
				setColorBlindMode,
				toggleThemeMode,
				toggleBoldText,
				toggleMorphism,
			}}>
			{children}
		</SettingsContext.Provider>
	);
};

export { Settings, SettingsContext };
