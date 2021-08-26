import { useAuth } from "../hooks/AuthContext";

import { Calendar } from "../pages/Calendar";
import { Login } from "../pages/Login";

export function AuthRoutes()  {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated ? <Calendar /> : <Login />}
    </>
  )
}