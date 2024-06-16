import React, { useEffect, useState } from 'react';
import UserService from '../services/account';

type AppContext = {
  user?: User | null;
  loading: boolean;
  logout: () => void;
}

const UserContext = React.createContext({} as AppContext);

const AppProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const logout = () => {
    setUser(null);
    localStorage.clear();
  }

  useEffect(() => {
    const getUser = async () => {
      console.log('getUser');
      if (localStorage && localStorage.getItem("token")) {
        try {
          const response = await UserService.getUser();
          if (response.status === 200) {
            setUser(response.data);
          }
        } catch (err) {
          console.error(err);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    }

    getUser();
  }, []);

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        loading,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default AppProvider;

export function useAppContext() {
  const Context = React.useContext(UserContext);
  return { ...Context };
}
