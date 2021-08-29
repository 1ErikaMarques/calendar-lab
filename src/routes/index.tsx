import { useAuth } from "../hooks/AuthContext";

import { CalendarHome } from "../pages/CalendarHome";
import { Login } from "../pages/Login";

export function AuthRoutes()  {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated ? <CalendarHome /> : <Login />}
    </>
  )
}