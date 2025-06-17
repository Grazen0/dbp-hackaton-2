import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router';
import { UserProvider } from './lib/auth/components/UserProvider';
import { Layout } from './lib/common/components/layout/Layout';
import { Index } from './pages/Index';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { Post } from './pages/posts/Post';
import { Posts } from './pages/posts/Posts';
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
  <BrowserRouter>
    <form onSubmit={() => {}}></form>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Layout>
          <Routes>
            <Route index element={<Index />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="posts" element={<Posts />} />
            <Route path="posts/:postId" element={<Post />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </UserProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
