import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Board from './Board';

// Mock implementation of Cell component
jest.mock('./Cell', () => (props) => (
  <td
    role="cell"
    className={`Cell ${props.isLit ? 'Cell-lit' : ''}`}
    onClick={props.flipCellsAroundMe}
  />
));

// Test for rendering the initial Board
test('renders Board correctly', () => {
  const { container } = render(<Board nrows={3} ncols={3} chanceLightStartsOn={0} />);
  
  // Snapshot test
  expect(container).toMatchSnapshot();
  
  // Check if the board has correct number of cells
  const cells = screen.getAllByRole('cell');
  expect(cells).toHaveLength(9); // 3 rows * 3 cols
});

// Test for handling cell-clicking
test('handles cell clicking correctly', () => {
  const { container } = render(<Board nrows={3} ncols={3} chanceLightStartsOn={0} />);
  
  // Find a cell
  const cell = screen.getAllByRole('cell')[0];
  
  // Click the cell
  fireEvent.click(cell);
  
  // Check if the cell flipping logic works by checking class changes or board state changes
  // This test can be improved by asserting specific board changes
  expect(container).toMatchSnapshot();
});

// Test for checking winning message
test('shows winning message when game is won', () => {
  // Setting up a won board state for testing
  const { container } = render(<Board nrows={3} ncols={3} chanceLightStartsOn={0} />);
  
  // Simulate winning state
  // We assume that the state and logic here make the board all lights off
  // For a real test, you might want to mock or set the board state directly.
  // For example:
  // render(<Board nrows={3} ncols={3} chanceLightStartsOn={0} initialBoardState={allOffBoard} />);
  
  // Check if the winning message is shown
  const winningMessage = screen.queryByText('You Won!');
  expect(winningMessage).toBeInTheDocument();
});
