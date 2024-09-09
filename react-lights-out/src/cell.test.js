import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Cell from './Cell';

// Test for rendering a Cell component properly
test('renders Cell correctly', () => {
  const { container } = render(<Cell flipCellsAroundMe={() => {}} isLit={false} />);
  
  // Snapshot test
  expect(container).toMatchSnapshot();
  
  // Check if Cell has correct class for unlit
  const cell = screen.getByRole('cell');
  expect(cell).toHaveClass('Cell');
  expect(cell).not.toHaveClass('Cell-lit');
  
  // Check for interaction
  cell.click();
});

test('renders Cell correctly when lit', () => {
  const { container } = render(<Cell flipCellsAroundMe={() => {}} isLit={true} />);
  
  // Snapshot test
  expect(container).toMatchSnapshot();
  
  // Check if Cell has correct class for lit
  const cell = screen.getByRole('cell');
  expect(cell).toHaveClass('Cell');
  expect(cell).toHaveClass('Cell-lit');
});
