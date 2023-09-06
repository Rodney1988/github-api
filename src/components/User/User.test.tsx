import { render, screen, waitFor } from '@testing-library/react';
import User from './User';
import { QueryClient, QueryClientProvider } from 'react-query';
import { mockUser } from './mockUser';

const qClient = new QueryClient();

describe('User Component', () => {
  it('renders user without errors', async () => {
    render(
      <QueryClientProvider client={qClient}>
        <User userProp={mockUser} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      const userComponent = screen.getByTestId('title');
      expect(userComponent).toBeInTheDocument();
    });
  });
  it('displays correct element content', async () => {
    render(
      <QueryClientProvider client={qClient}>
        <User userProp={mockUser} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      const userComponent = screen.getByTestId('title');
      expect(userComponent.textContent).toBe('User: dummyUser');
    });
  });
});
