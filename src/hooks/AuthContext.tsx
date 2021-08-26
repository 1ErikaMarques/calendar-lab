import { createContext, ReactNode, useContext } from "react";

interface SignInCredentials  {
  email: string;
  password: string;
}
interface SignUpCredentials extends SignInCredentials {
  name: string;  
}

interface AuthContextData  {
  signIn(credentials: SignInCredentials): void;
  signUp(credentials: SignUpCredentials): void;
  isAuthenticated: boolean;
}

interface AuthProviderProps  {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps)  {
  const isAuthenticated = false;

  function signIn({ email, password }: SignInCredentials) {
    console.log({ email,password })
  }

  function signUp({ email,password, name }: SignUpCredentials){
    console.log({ email, password, name})
  }

  return  (
    <AuthContext.Provider value={{ signIn, isAuthenticated, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth()  {
  const context = useContext(AuthContext);

  return context;
}

