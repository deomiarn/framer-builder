import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout.tsx";
import LoginPage from "@/features/auth/pages/LoginPage.tsx";
import { ProtectedRoute } from "@/shared/routes/ProtectedRoute.tsx";
import DashboardPage from "@/features/home/DashboardPage.tsx";
import ElementsPage from "@/features/elements/ElementsPage.tsx";
import ColoringPage from "@/features/coloring/ColoringPage.tsx";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <RootLayout />,
        children: [
          { path: "/", element: <DashboardPage /> },
          { path: "elements", element: <ElementsPage /> },
          { path: "coloring", element: <ColoringPage /> },
        ],
      },
    ],
  },
]);
