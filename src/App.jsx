import { AuthContextProvider as AuthProvider } from './context/AuthContext';
import { AppContextProvider as AppProvider } from './context/AppContext';
import AppRoutes from './routes/AppRoutes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
