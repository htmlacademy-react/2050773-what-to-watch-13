import Footer from './footer';
import { withHistory } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const expectedText = /What to watch/i;
    const preparedComponent = withHistory(<Footer />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
