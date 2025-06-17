import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router';
import { UserProvider } from './lib/auth/components/UserProvider';
import { Layout } from './lib/common/components/layout/Layout';
import { CategoryPage } from './pages/Category';
import { Index } from './pages/Index';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { Register } from './pages/Register';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      retryDelay: 0,
    },
  },
});

export const App = () => (
  <BrowserRouter basename="/dbp-hackaton-2">
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Layout>
          <Routes>
            <Route index element={<Index />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path=":id" element={<CategoryPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </UserProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
