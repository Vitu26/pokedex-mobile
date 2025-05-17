import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { FavoritesProvider } from '../presentation/context/FavoritesContext';

const queryClient = new QueryClient();

type Props = {
  children: ReactNode;
};

export function ReactQueryProvider({ children }: Props) {
    return (
        <QueryClientProvider client={queryClient}>
          <FavoritesProvider>
            {children}
          </FavoritesProvider>
        </QueryClientProvider>
      );
}

