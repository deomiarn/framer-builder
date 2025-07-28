import { Navigate, Outlet } from "react-router-dom";
import { useAuthCtx } from "@/features/auth/AuthContext.ts";
import Spinner from "@/shared/ui/spinner.tsx";

export const ProtectedRoute = () => {
  const { session, loading } = useAuthCtx();
  if (loading) return <Spinner />;
  return session ? <Outlet /> : <Navigate to="/login" replace />;
};
