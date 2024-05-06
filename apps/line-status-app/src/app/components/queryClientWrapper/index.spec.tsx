import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClientWrapper } from './index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the QueryClient and QueryClientProvider
jest.mock('@tanstack/react-query', () => ({
  QueryClient: jest.fn(),
  QueryClientProvider: jest.fn(({ children }) => children),
}));

describe('QueryClientWrapper', () => {
  it('renders children with QueryClientProvider', () => {
    // Render the QueryClientWrapper component with a child element
    const { getByText } = render(
      <QueryClientWrapper>
        <div>Child Component</div>
      </QueryClientWrapper>
    );

    // Check if the child component is rendered
    expect(getByText('Child Component')).toBeInTheDocument();

    // Check if QueryClientProvider is used with the mocked QueryClient
    expect(QueryClient).toHaveBeenCalledTimes(1);
    expect(QueryClientProvider).toHaveBeenCalledTimes(1);

    expect(QueryClientProvider).toHaveBeenCalledWith(
      expect.objectContaining({
        client: expect.any(QueryClient), // Assert that client is an instance of QueryClient
      }),
      {}
    );
  });
});
