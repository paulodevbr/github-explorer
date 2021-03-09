import React, { createContext, useCallback, useContext, useState } from 'react';
import isMobile from '../utils/isMobile';

interface ScrollComponentsState {
  components: { [key: string]: React.RefObject<HTMLDivElement> };
}

interface SetRefComponentsParams {
  key: string;
  component: React.RefObject<HTMLDivElement>;
}

interface ScrollContextData {
  scrollToComponent(key: string): void;
  setRefComponent(ref: SetRefComponentsParams): void;
}

const Scroll = createContext<ScrollContextData>({} as ScrollContextData);

const ScrollProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<ScrollComponentsState>(
    {} as ScrollComponentsState,
  );

  const setRefComponent = useCallback(
    ({ key, component }: SetRefComponentsParams) => {
      const newComponents = { ...data.components, [key]: component };
      setData({ components: newComponents });
    },
    [data],
  );

  const scrollToComponent = useCallback(
    (key: string) => {
      const block = isMobile() ? 'start' : 'center';
      const ref = data.components[key];
      if (ref && ref.current) {
        ref.current.scrollIntoView({
          block,
          behavior: 'smooth',
          inline: 'start',
        });
      }
    },
    [data],
  );

  return (
    <Scroll.Provider
      value={{
        scrollToComponent,
        setRefComponent,
      }}
    >
      {children}
    </Scroll.Provider>
  );
};

function useScroll(): ScrollContextData {
  const context = useContext(Scroll);

  if (!context) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }

  return context;
}

export { ScrollProvider, useScroll };
