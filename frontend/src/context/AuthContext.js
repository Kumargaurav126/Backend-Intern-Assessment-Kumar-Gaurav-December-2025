import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedName = localStorage.getItem('fullName'); 

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ ...decoded, fullName: storedName, token }); 
      } catch (e) {
        localStorage.removeItem('token');
        localStorage.removeItem('fullName');
      }
    }
    setLoading(false);
  }, []);

  const login = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('fullName', data.fullName); 
    
    const decoded = jwtDecode(data.token);
    setUser({ ...decoded, fullName: data.fullName, token: data.token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('fullName');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;