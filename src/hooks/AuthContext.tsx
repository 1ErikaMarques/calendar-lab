import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface SignInCredentials {
    email: string;
    password: string;
}

interface SignUpCredentials extends SignInCredentials {
    name: string;
}

interface User extends SignInCredentials, SignUpCredentials {
}

interface AuthContextData {
    signIn(credentials: SignInCredentials): void;
    signUp(credentials: SignUpCredentials): void;
    isAuthenticated: boolean;
    logout(): void;
    user: User;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({children}: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({} as User);

    function signIn({email, password}: SignInCredentials) {
        const storedUser = localStorage.getItem('user');

//Verificando se existe usuario cadastrado
        if (storedUser) {
            const userLogged = JSON.parse(storedUser) as User;

            if (email === userLogged.email && password === userLogged.password) {
                setIsAuthenticated(true)
                sessionStorage.setItem('loggedUser', JSON.stringify(userLogged))
            } else {
               toast.error("usuário ou senha incorretos",{
                   theme: "colored"
               })
            }
        } else {
            toast.warning("usuário não cadastrado", {
                theme: "colored"
            })
        }
    }

    /**
     * função para cadastrar usuario
     * @param email email do usuario
     * @param password senha do usuario
     * @param name nome do usuario
     */
    function signUp({email, password, name}: SignUpCredentials) {

        const user = {
            name,
            email,
            password,
        }
        localStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('loggedUser', JSON.stringify(user));

        setIsAuthenticated(true);
    }

    function logout() {
        sessionStorage.clear();
        setIsAuthenticated(false);
    }

    useEffect(() => {
        function loadUserStorageDate() {
            const storedUser = sessionStorage.getItem('loggedUser');

            if (storedUser) {
                const loggedUser = JSON.parse(storedUser) as User;
                setUser(loggedUser);
                setIsAuthenticated(true);
            }
        }

        loadUserStorageDate();
    }, []);

    return (
        <AuthContext.Provider value={{signIn, isAuthenticated, signUp, logout, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

