import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface SignInCredentials  {
  email: string;
  password: string;
}
interface SignUpCredentials extends SignInCredentials {
  name: string;  
}

interface User extends SignInCredentials, SignUpCredentials {
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function signIn({ email, password }: SignInCredentials) {
    const storedUser = localStorage.getItem('user')

//Verificando se existe usuario cadastrado
    if(storedUser)  {
        const userLogged = JSON.parse(storedUser) as User;
        
        if (email === userLogged.email && password === userLogged.password) {
          setIsAuthenticated(true)
          sessionStorage.setItem('loggedUser',JSON.stringify(email))
        }else {
          alert('usuario ou senha incorretos')
        }
      }else {
        alert('usuário não cadastrado')
      }
  }
/**
 * função para cadastrar usuario
 * @param email email do usuario
 * @param password senha do usuario
 * @param name nome do usuario
 */
function signUp({ email, password, name }: SignUpCredentials) {
    
    const user = {
      name,
      email,
      password,
    }
     localStorage.setItem('user',JSON.stringify(user))
     sessionStorage.setItem('loggedUser',JSON.stringify(email))

    setIsAuthenticated(true)
  }

  useEffect(() => {
      function loadUserStorageDate() {
        const storedUser =  sessionStorage.getItem('loggedUser');
        
        if(storedUser){
          const loggedUser = JSON.parse(storedUser) as User;
          setIsAuthenticated(true)
        }
      }
      loadUserStorageDate();
    },[]);

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

