'use client';
import React from 'react';
import { Menu } from 'lucide-react';

import { Button } from '../Button';
import { NavigationItem } from '../NavigationItem';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '@/constants';

export type NavType = {
  path: string;
  label: string;
};

export const NAVIGATION_ITEMS: NavType[] = [
  { path: ROUTES.EMPLOYEES, label: 'EMPLOYEES' },
  { path: ROUTES.ORGANIZATION, label: 'ORGANIZATION' },
];

const Header: React.FC = () => {
  const [isOpened, setIsOpened] = React.useState(false);
  const { pathname } = useLocation();

  return (
    <header className="bg-background sticky top-0 z-40 w-full">
      <div className="container flex justify-end h-20 items-center">
        <Button variant="link" className="lg:hidden mr-auto lg:mx-0  items-center" onClick={() => setIsOpened(true)}>
          <Menu size={30} />
        </Button>

        <div className="hidden lg:flex items-center space-x-10  ">
          {NAVIGATION_ITEMS.map((item) => (
            <NavigationItem key={item.label} label={item.label} path={item.path} pathname={pathname} />
          ))}
        </div>
        {/* {isOpened && <DynamicNavModal pathname={pathname} isOpened={isOpened} onClose={() => setIsOpened(false)} />} */}
      </div>
    </header>
  );
};

export default Header;
