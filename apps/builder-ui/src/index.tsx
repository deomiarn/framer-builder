import { createBrowserRouter } from "react-router-dom";
import LoginPage from "@/features/auth/pages/LoginPage.tsx";
import { ProtectedRoute } from "@/shared/routes/ProtectedRoute.tsx";
import DashboardPage from "@/features/dashboard/DashboardPage.tsx";
import ElementsPage from "@/features/elements/ElementsPage.tsx";
import ColoringPage from "@/features/coloring/ColoringPage.tsx";
import { AppLayout } from "@/layouts/AppLayout.tsx";

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
          {
            path: "elements",
            element: <ElementsPage />,
            handle: { title: "Elements" },
          },
          {
            path: "coloring",
            element: <ColoringPage />,
            handle: { title: "Coloring" },
          },
        ],
      },
    ],
  },
]);
