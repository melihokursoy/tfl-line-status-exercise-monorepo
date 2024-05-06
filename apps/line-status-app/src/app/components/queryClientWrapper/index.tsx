import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: true,
      refetchOnWindowFocus: true,
      retry: 3,
      retryDelay: 300,
    },
  },
});

export interface QueryClientWrapperProps {
  children: ReactNode;
}

export const QueryClientWrapper: React.FC<QueryClientWrapperProps> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
