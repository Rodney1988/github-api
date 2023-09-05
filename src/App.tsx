import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 10 * 60 * 100, cacheTime: 200000 },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
