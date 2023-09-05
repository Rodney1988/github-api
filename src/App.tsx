import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { NavBar } from './components/NavBar/NavBar';
import { Instructions } from './pages/Instructions/Instructions';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 10 * 60 * 100, cacheTime: 200000 },
  },
});

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/instructions" element={<Instructions />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
