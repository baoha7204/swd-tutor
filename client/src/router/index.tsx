'use client';

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  Outlet,
} from 'react-router-dom';

import { Spinner } from '@/components/ui/spinner';

// Layouts
import DefaultLayout from '@/components/layouts/DefaultLayout';
import AuthLayout from '@/components/layouts/AuthLayout';

// Public pages
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/Authentication/Login';
import RegisterPage from '@/pages/Authentication/Register';

// Protected pages
import Dashboard from '@/pages/Dashboard';
import TopicsPage from '@/pages/TopicsPage';
import SubTopicsPage from '@/pages/SubTopicsPage';
import ModulesPage from '@/pages/ModulesPage';
import ExercisePage from '@/pages/ExercisePage';
import ResultPage from '@/pages/ExercisePage/result';

import AIChatBox from '@/pages/AIChatBox';
// import ReviewPage from '@/pages/ReviewPage';
// import CommunityPage from '@/pages/CommunityPage';
// import ProfilePage from '@/pages/ProfilePage';

// Admin pages
// import AdminDashboard from '@/pages/Admin/Dashboard';
// import AdminUsersPage from '@/pages/Admin/Users';
// import AdminContentPage from '@/pages/Admin/Content';

import { useAuth } from '@/hooks/useAuth';
import UnauthorizedPage from '@/pages/403';
import NotFoundPage from '@/pages/404';

// Protect routes that require authentication
const ProtectedRoute = () => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner size='lg' className='bg-black dark:bg-white' />;
  }

  if (!currentUser) {
    return <Navigate to='/unauthorized' />;
  }

  return <Outlet />;
};

const AdminRoute = () => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner size='lg' className='bg-black dark:bg-white' />;
  }

  if (!currentUser || !currentUser.isAdmin) {
    return <Navigate to='/unauthorized' />;
  }

  return <Outlet />;
};

const Router = () => {
  const router = createBrowserRouter([
    // Auth routes with AuthLayout
    {
      element: <AuthLayout />,
      children: [
        {
          path: '/login',
          element: <LoginPage />,
        },
        {
          path: '/register',
          element: <RegisterPage />,
        },
      ],
    },
    // Main application routes with Layout
    {
      element: <DefaultLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'unauthorized', element: <UnauthorizedPage /> },
        { path: '*', element: <NotFoundPage /> },
        // Protected route
        {
          // element: <ProtectedRoute />,
          children: [
            { path: 'dashboard', element: <Dashboard /> },
            // { path: 'profile', element: <ProfilePage /> },
            // { path: 'review', element: <ReviewPage /> },
            // { path: 'community', element: <CommunityPage /> },
            // Topics navigation flow
            { path: 'topics', element: <TopicsPage /> },
            { path: 'topics/:topicId', element: <SubTopicsPage /> },
            {
              path: 'topics/:topicId/subtopics/:subtopicId',
              element: <ModulesPage />,
            },
            {
              path: 'topics/:topicId/subtopics/:subtopicId/modules/:moduleId',
              element: <ExercisePage />,
            },
            {
              path: 'topics/:topicId/subtopics/:subtopicId/modules/:moduleId/result',
              element: <ResultPage />,
            },
            // AI Chat Box
            { path: 'ai-chat', element: <AIChatBox /> },
          ],
        },
        // Admin route
        {
          path: 'admin',
          element: <AdminRoute />,
          children: [
            // { index: true, element: <AdminDashboard /> },
            // { path: 'users', element: <AdminUsersPage /> },
            // { path: 'content', element: <AdminContentPage /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
