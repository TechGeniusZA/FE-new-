import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const setToken = (token) => {
    localStorage.setItem("token", token);
  };
  const getToken = () => {
    return localStorage.getItem("token");
  };
  const removeToken = () => {
    return localStorage.removeItem("token");
  };
  const login = (user) => {
    setUser(user);
    setIsLoggedIn(true);
  };
  const logout = () => {
    removeToken();
    setUser(null);
    setIsLoggedIn(false);
    window.location.pathname.replace('/')
  };

  return (
    <AuthContext.Provider value={{ user,isLoggedIn, login, setToken, getToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
