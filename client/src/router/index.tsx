import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import { Spinner } from "@/components/ui/spinner";

// Layouts
import DefaultLayout from "@/components/layouts/DefaultLayout";
import AuthLayout from "@/components/layouts/AuthLayout";

// Public pages
import HomePage from "@/pages/Home";
import LoginPage from "@/pages/Authentication/Login";
import RegisterPage from "@/pages/Authentication/Register";

// Protected pages

// Admin pages

import { useAuth } from "@/hooks/useAuth";
import UnauthorizedPage from "@/pages/403";
import NotFoundPage from "@/pages/404";

// Protect routes that require authentication
const ProtectedRoute = () => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner size="lg" className="bg-black dark:bg-white" />;
  }

  if (!currentUser) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

const AdminRoute = () => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner size="lg" className="bg-black dark:bg-white" />;
  }

  if (!currentUser || !currentUser.isAdmin) {
    return <Navigate to="/unauthorized" />;
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
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
      ],
    },
    // Main application routes with Layout
    {
      element: <DefaultLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "unauthorized", element: <UnauthorizedPage /> },
        { path: "*", element: <NotFoundPage /> },
        // Protected route
        {
          element: <ProtectedRoute />,
          children: [
            { path: "dashboard", element: <div>Dashboard Page</div> },
            { path: "profile", element: <div>Profile Page</div> },
          ],
        },
        // Admin route
        {
          path: "admin",
          element: <AdminRoute />,
          children: [{ index: true, element: <div>Admin Dashboard</div> }],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
