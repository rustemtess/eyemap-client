// ProtectedRoute.tsx
import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token"); // или откуда у тебя хранится токен

  if (token) {
    // если токена нет, редирект на страницу логина
    return <Navigate to="/" replace />;
  }

  return children; // если токен есть, отображаем страницу
};

export default ProtectedRoute;
