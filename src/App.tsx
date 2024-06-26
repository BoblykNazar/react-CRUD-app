import { Outlet, useLocation } from 'react-router-dom';

import './App.scss';
import { Header } from './components/Header';

export const App = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && <Header />}
      <Outlet />
    </>
  );
}
