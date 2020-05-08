import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render as testLibraryRender, fireEvent } from '@testing-library/react';
import PropTypes from 'prop-types';
import Header from 'Header';
import { ThemeContext, useTheme } from '../../ThemeSwitcher';

const Wrapper = ({ children }) => {
  const theme = useTheme();

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

Wrapper.propTypes = {
  children: PropTypes.node
};

Wrapper.defaultProps = {
  children: null
};

const render = (ui, options) =>
  testLibraryRender(ui, { wrapper: Wrapper, ...options });

describe('Header component', () => {
  it('renders in light and dark mode', async () => {
    const { getByText } = render(
      <Router>
        <Header />
      </Router>
    );
    const switcher = getByText(/🌔/i);
    expect(switcher).toBeTruthy();

    await fireEvent.click(switcher);

    expect(switcher).toHaveTextContent('🌒');
  });
});
