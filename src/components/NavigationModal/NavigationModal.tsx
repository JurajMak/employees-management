import React from 'react';

import { NavigationItem } from '../NavigationItem';

import { NAVIGATION_ITEMS } from '../Header';
import { Sheet, SheetContent, SheetTitle } from '../Sheet';

export type NavModalProps = {
  isOpened: boolean;
  onClose: () => void;
  pathname: string;
};

const NavigationModal: React.FC<NavModalProps> = ({ isOpened, onClose, pathname }) => {
  return (
    <Sheet open={isOpened} onOpenChange={onClose}>
      <SheetTitle className="hidden"> </SheetTitle>
      <SheetContent side="top">
        <div className="flex flex-col gap-10 m-6  items-center justify-center">
          {NAVIGATION_ITEMS.map((item) => (
            <NavigationItem
              key={item.label}
              label={item.label}
              path={item.path}
              pathname={pathname}
              onClick={onClose}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavigationModal;
