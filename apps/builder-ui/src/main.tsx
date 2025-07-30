import "./App.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { index } from "@/index.tsx";
import { AuthProvider } from "@/features/auth/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={index} />
    </AuthProvider>
  </StrictMode>,
);
