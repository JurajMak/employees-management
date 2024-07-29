import React from 'react';
import { Header } from '../Header';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div>
      <div className="mb-20">
        <Header />
      </div>

      <Outlet />
    </div>
  );
};

export default Layout;
