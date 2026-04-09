// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const token = localStorage.getItem('google_token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Check if token is expired
        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded);
        } else {
          localStorage.removeItem('google_token');
        }
      } catch (error) {
        localStorage.removeItem('google_token');
      }
    }
    setLoading(false);
  }, []);

//   const login = (credentialResponse) => {
//     const decoded = jwtDecode(credentialResponse.credential);
//     setUser(decoded);
//     localStorage.setItem('google_token', credentialResponse.credential);
//   };
const login = (data) => {
    let userData;
  
    if (data?.credential) {
      // Google login
      userData = jwtDecode(data.credential);
    } else if (data?.email) {
      // Email login (manual)
      userData = { email: data.email };
    } else {
      throw new Error("Invalid login data");
    }
  
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('google_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};