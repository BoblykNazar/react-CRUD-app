import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import './App.scss';
import { Header } from './components/Header/Header';
import { setupDefaultCredentials } from './helpers';

export function App() {
  const location = useLocation();

  useEffect(() => {
    setupDefaultCredentials();
  }, []);

  return (
    <>
      {location.pathname !== '/login' && <Header />}
      <Outlet />
    </>
  );
}
