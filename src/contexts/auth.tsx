import { createContext, ReactNode } from 'react';
import { AuthenticatedUser, AuthenticationResponse} from '../commons/type';
import { useAuth } from '@/hooks/useAuth';

interface AuthContextType {
  authenticated: boolean;
  authenticatedUser?: AuthenticatedUser;
  loading: boolean;
  handleLogin: (response: AuthenticationResponse) => void;
  handleLogout: () => void;
  handleVerifyAuthentication: () => void;
  verifyAuthentication: boolean;
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const {authenticated, authenticatedUser, loading, handleLogin, handleLogout, handleVerifyAuthentication, verifyAuthentication} = useAuth();

  return (
    <AuthContext.Provider value={{loading, authenticated, authenticatedUser, handleLogin, handleLogout, handleVerifyAuthentication, verifyAuthentication}}>
      {children}
    </AuthContext.Provider>
  )
}