import Dashboard from '@components/Dashboard';
import Settings from '@components/Settings';
import { createContext, useMemo, useReducer } from 'react';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';

import '@styles/App.css';
import '@styles/Wave.css';

const INITIAL_SETTINGS = {
  notifyPeriod: 300000, // in miliseconds
  dailyWaterIntake: 1000, // in mililiters
};

type TSettings = typeof INITIAL_SETTINGS;
type TReducerSettings = (prev: TSettings, next: TSettings) => TSettings;
type TContextSettings = {
  settings: TSettings;
  updateSettings: React.Dispatch<TSettings>;
};

export const SettingsContext = createContext<TContextSettings>({
  settings: INITIAL_SETTINGS,
  updateSettings: () => {},
});

export default function App() {
  const [settings, updateSettings] = useReducer<TReducerSettings>(
    (prev, next) => {
      return { ...prev, ...next };
    },
    INITIAL_SETTINGS
  );

  const contextValue = useMemo(() => {
    return { settings, updateSettings };
  }, [settings, updateSettings]);

  return (
    <SettingsContext.Provider value={contextValue}>
      <Settings />
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </SettingsContext.Provider>
  );
}
