import {User, onAuthStateChanged} from 'firebase/auth';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {auth} from '../database/config';

interface Props {
  children?: ReactNode;
}

interface AuthState {
  user: User | null | undefined;
  initializing: boolean;
}

const AuthContext = createContext<AuthState>({} as AuthState);

export const AuthProvider = ({children}: Props) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, user => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return subscriber;
  }, []);

  return (
    <AuthContext.Provider value={{initializing, user}}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
