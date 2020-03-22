import React, { useState } from 'react';

export const DARK_THEME = 'dark';
export const LIGHT_THEME = 'light';

const TEXT_COLORS = {
  [DARK_THEME]: 'white',
  [LIGHT_THEME]: 'black'
};

export const ThemeContext = React.createContext({
  theme: LIGHT_THEME,
  color: TEXT_COLORS[LIGHT_THEME],
  setTheme: () => {}
});

export const useTheme = () => {
  const [theme, setThemeState] = useState(LIGHT_THEME);

  const setTheme = React.useCallback(newTheme => {
    setThemeState(newTheme);
  }, []);

  return {
    theme,
    color: TEXT_COLORS[theme],
    setTheme
  };
};
