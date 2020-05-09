import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Chip from '../Chip';

// server side rendering test
describe('Chip component (ssr)', () => {
  it('renders', () => {
    ReactDOMServer.renderToString(
      <Chip onDrag={jest.fn()} id={1} isDragged={false} isDropped={false} />
    );
  });
});
