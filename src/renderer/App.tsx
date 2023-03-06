import Dashboard from '@components/Dashboard';
import { createContext, useMemo, useReducer } from 'react';
import {
  Navigate,
  Outlet,
  Route,
  MemoryRouter as Router,
  Routes,
} from 'react-router-dom';

import Login from '@components/Login';
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

function ProtectedRoute({
  user,
  redirectPath,
}: {
  user: string;
  redirectPath?: string;
}) {
  if (user !== 'logged') {
    return <Navigate to={redirectPath as string} replace />;
  }

  return <Outlet />;
}

ProtectedRoute.defaultProps = {
  redirectPath: '/login',
};

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
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute user="notlogged" />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </SettingsContext.Provider>
  );
}
