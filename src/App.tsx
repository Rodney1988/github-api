import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { NavBar } from './components/NavBar/NavBar';
import { Instructions } from './pages/Instructions/Instructions';
import { SignUp } from './pages/SignUp/SignUp';
import { Login } from './pages/Login/Login';
import { useAuth } from './hooks/useAuth';
import { Navigate } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 10 * 60 * 100, cacheTime: 200000 },
  },
});

function App() {
  const user = useAuth();
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <NavBar />
        <div style={{ marginLeft: '15px' }}>
          <Routes>
            <Route path="/" element={user ? <HomePage /> : <SignUp />} />
            <Route
              path="/signup"
              element={!user ? <SignUp /> : <Navigate to="/" replace={true} />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" replace={true} />}
            />
            <Route
              path="/instructions"
              element={user ? <Instructions /> : <SignUp />}
            />
          </Routes>
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
