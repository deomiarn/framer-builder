import "./App.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { index } from "@/index.tsx";
import { AuthProvider } from "@/features/auth/AuthProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={index} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
