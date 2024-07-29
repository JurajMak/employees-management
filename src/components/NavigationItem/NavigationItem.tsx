import React from 'react';

import { Button } from '../Button';
import { NavType } from '../Header';
import { Link } from 'react-router-dom';

export type NavigationItemProps = NavType & {
  pathname: string;
};

const NavigationItem: React.FC<NavigationItemProps> = ({ path, label, pathname }) => {
  return (
    <Button asChild variant={pathname === path ? 'default' : 'link'}>
      <Link to={path}>{label}</Link>
    </Button>
  );
};

export default NavigationItem;
