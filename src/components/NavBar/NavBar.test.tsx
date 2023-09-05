import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NavBar } from './NavBar';

describe('NavBar Component', () => {
  it('renders the initial NavBar state with the hamburger menu', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const hamburgerButton = screen.getByTestId('hamburger-button');
    expect(hamburgerButton).toBeInTheDocument();
  });

  it('Hamburguer button expands and collapes on clicks', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const hamburgerButton = screen.getByTestId('hamburger-button');

    expect(hamburgerButton).toBeInTheDocument();
    expect(hamburgerButton).toHaveAttribute('data-TestId', 'hamburger-button');

    fireEvent.click(hamburgerButton);
    expect(screen.getByTestId('expanded-section')).toBeInTheDocument();

    fireEvent.click(hamburgerButton);
    expect(screen.queryByTestId('expanded-section')).not.toBeInTheDocument();
  });

  it('renders the buttons and checks that they have correct attributes', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    const homeButton = screen.getByText('Home');
    expect(homeButton).toBeInTheDocument();
    expect(homeButton).toHaveAttribute('href', '/');

    const instructionsButton = screen.getByText('Instructions');
    expect(instructionsButton).toBeInTheDocument();
    expect(instructionsButton).toHaveAttribute('href', '/instructions');
  });
});
