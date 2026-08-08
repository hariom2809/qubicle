import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth()

  if (loading) return null;
  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
}