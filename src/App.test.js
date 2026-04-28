import { render, screen } from '@testing-library/react';
import App from './App';

// REVIEW: This is the default Create React App test and will FAIL — App.js no longer renders the text "learn react". Replace with a meaningful test, e.g. assert the hero heading "Welcome to Movie Collection Manager" or the empty-state copy. Also note the test will need to mock localStorage and fetchMovieData to render reliably.
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
