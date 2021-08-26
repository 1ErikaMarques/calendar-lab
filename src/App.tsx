import React from 'react';

import { AuthProvider } from './hooks/AuthContext';

import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { GlobalStyle } from './styles/global';

function App() {
  return (
    <AuthProvider>   
      <Login />    
      <GlobalStyle />
   </AuthProvider>
  );
}

export default App;
