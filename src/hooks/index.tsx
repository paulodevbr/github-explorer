import React from 'react';
import { ToastProvider } from './toast';
import { SearchProvider } from './search';
import { ProfileProvider } from './profile';

export const AppProvider: React.FC = ({ children }) => (
  <ToastProvider>
    <SearchProvider>
      <ProfileProvider>{children}</ProfileProvider>
    </SearchProvider>
  </ToastProvider>
);
