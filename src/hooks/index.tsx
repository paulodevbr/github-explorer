import React from 'react';
import { ToastProvider } from './toast';
import { SearchProvider } from './search';

export const AppProvider: React.FC = ({ children }) => (
  <SearchProvider>
    <ToastProvider>{children}</ToastProvider>
  </SearchProvider>
);
