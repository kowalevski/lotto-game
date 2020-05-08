import React, { useState } from 'react';

export const DARK_THEME = 'dark';
export const LIGHT_THEME = 'light';

export const TEXT_COLORS = {
  [DARK_THEME]: 'white',
  [LIGHT_THEME]: 'black'
};

export const ThemeContext = React.createContext({
  theme: LIGHT_THEME,
  color: TEXT_COLORS[LIGHT_THEME],
  setTheme: () => {},
  toggleTheme: () => {}
});

export const useTheme = () => {
  const [theme, setThemeState] = useState(LIGHT_THEME);

  const setTheme = React.useCallback(newTheme => {
    setThemeState(newTheme);
  }, []);

  const toggleTheme = () =>
    setThemeState(theme === DARK_THEME ? LIGHT_THEME : DARK_THEME);

  return {
    theme,
    color: TEXT_COLORS[theme],
    setTheme,
    toggleTheme
  };
};
