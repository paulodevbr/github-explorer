import React from 'react';
import { ToastProvider } from './toast';
import { SearchProvider } from './search';
import { ProfileProvider } from './profile';
import { NotesProvider } from './notes';
import { ScrollProvider } from './scroll';

export const AppProvider: React.FC = ({ children }) => (
  <ToastProvider>
    <ScrollProvider>
      <SearchProvider>
        <NotesProvider>
          <ProfileProvider>{children}</ProfileProvider>
        </NotesProvider>
      </SearchProvider>
    </ScrollProvider>
  </ToastProvider>
);
