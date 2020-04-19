import React, { useContext } from 'react';
import { FormCheck } from 'react-bootstrap';
import { ThemeContext, DARK_THEME, LIGHT_THEME } from '../ThemeSwitcher';

const ThemeControl = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleChange = () => {
    const newVal = theme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    setTheme(newVal);
  };

  return (
    <FormCheck
      type="switch"
      id="custom-switch"
      label="🌒"
      onChange={handleChange}
    />
  );
};

export default ThemeControl;
