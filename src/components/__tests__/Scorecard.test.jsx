import React from 'react';
import { render as libRender } from '@testing-library/react';
import PropTypes from 'prop-types';
import Scorecard from '../Scorecard';
import {
  ThemeContext,
  DARK_THEME,
  LIGHT_THEME,
  TEXT_COLORS
} from '../../ThemeSwitcher';

const render = (ui, { theme = LIGHT_THEME, ...options } = {}) => {
  const ThemeWrapper = ({ children }) => (
    <ThemeContext.Provider
      value={{
        theme,
        color: TEXT_COLORS[theme],
        setTheme: jest.fn(),
        toggleTheme: jest.fn()
      }}
    >
      {children}
    </ThemeContext.Provider>
  );

  ThemeWrapper.propTypes = {
    children: PropTypes.node.isRequired
  };

  return libRender(ui, {
    ...options,
    wrapper: ThemeWrapper
  });
};

const mockedCardNumbers = {
  '123': {
    bingoNumber: 1,
    chipId: null,
    isChecked: false
  }
};
const mockedRows = {
  '0': ['123']
};

describe('Scorecard component', () => {
  it('renders in dark', () => {
    const { container } = render(
      <Scorecard
        onCover={jest.fn()}
        cardNumbers={mockedCardNumbers}
        rows={mockedRows}
      />,
      {
        theme: DARK_THEME
      }
    );
    const card = container.querySelector('.card');

    expect(card).toBeTruthy();
    expect(card.classList.toString()).toMatch('bg-dark text-white');
  });
  it('renders in light', () => {
    const { container } = render(
      <Scorecard
        onCover={jest.fn()}
        cardNumbers={mockedCardNumbers}
        rows={mockedRows}
      />,
      {
        theme: LIGHT_THEME
      }
    );
    const card = container.querySelector('.card');

    expect(card).toBeTruthy();
    expect(card.classList.toString()).toMatch('bg-light text-black');
  });
});
