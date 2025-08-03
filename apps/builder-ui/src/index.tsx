import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/features/auth/pages/LoginPage.tsx";
import { ProtectedRoute } from "@/shared/routes/ProtectedRoute.tsx";
import { AppLayout } from "@/layouts/AppLayout.tsx";
import DashboardPage from "@/features/dashboard/DashboardPage.tsx";

export const index = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <DashboardPage />,
            handle: { title: "Dashboard" },
          },
        ],
      },
    ],
  },
]);
