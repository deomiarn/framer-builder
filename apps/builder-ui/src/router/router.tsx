import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout.tsx";
import HomePage from "@/features/home/HomePage.tsx";
import ElementsPage from "@/features/elements/ElementsPage.tsx";
import ColoringPage from "@/features/coloring/ColoringPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "elements", element: <ElementsPage /> },
      { path: "coloring", element: <ColoringPage /> },
    ],
  },
]);
