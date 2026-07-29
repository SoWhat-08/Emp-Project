import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders WorkHub navbar', () => {
  render(<App />);
  const navbarHeading = screen.getByText(/WorkHub/i);
  expect(navbarHeading).toBeInTheDocument();
});