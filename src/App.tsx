import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import { NavBar } from './components/NavBar/NavBar';
import { Instructions } from './pages/Instructions/Instructions';
import { SignUp } from './pages/SignUp/SignUp';
import { Login } from './pages/Login/Login';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 10 * 60 * 100, cacheTime: 200000 },
  },
});

function App() {
  const context = useAuthContext();
  const userExists = context?.userToken;

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <NavBar />
        <div style={{ marginLeft: '15px' }}>
          <Routes>
            <Route
              path="/"
              element={
                userExists ? (
                  <HomePage />
                ) : (
                  <Navigate to="/signup" replace={true} />
                )
              }
            />
            <Route
              path="/signup"
              element={
                !userExists ? <SignUp /> : <Navigate to="/" replace={true} />
              }
            />
            <Route
              path="/login"
              element={
                !userExists ? <Login /> : <Navigate to="/" replace={true} />
              }
            />
            <Route path="/instructions" element={<Instructions />} />
          </Routes>
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
