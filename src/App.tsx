import { AuthProvider } from './hooks/AuthContext';

import { AuthRoutes } from './routes';
import { GlobalStyle } from './styles/global';

function App() {
  
  return (
    <AuthProvider>  
       <AuthRoutes />  
      <GlobalStyle />
   </AuthProvider>
  );
}

export default App;
