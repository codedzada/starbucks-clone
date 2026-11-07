import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('sb_current_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse current user session:', error);
        localStorage.removeItem('sb_current_user');
      }
    }

    const existingUsers = localStorage.getItem('sb_users');
    if (!existingUsers) {
      const defaultUsers = [
        {
          firstName: 'Starbucks',
          lastName: 'Guest',
          email: 'guest@starbucks.com',
          password: 'Password123!',
        }
      ];
      localStorage.setItem('sb_users', JSON.stringify(defaultUsers));
    }

    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const usersStr = localStorage.getItem('sb_users');
        const users = usersStr ? JSON.parse(usersStr) : [];
        
        const foundUser = users.find(
          (user) => user.email.toLowerCase() === email.toLowerCase()
        );

        if (!foundUser) {
          reject(new Error('We couldn’t find an account matching that email address.'));
          return;
        }

        if (foundUser.password !== password) {
          reject(new Error('The password you entered is incorrect. Please try again.'));
          return;
        }

        const sessionUser = {
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          email: foundUser.email,
        };

        localStorage.setItem('sb_current_user', JSON.stringify(sessionUser));
        setUser(sessionUser);
        resolve(sessionUser);
      }, 800);
    });
  };

  const register = (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const usersStr = localStorage.getItem('sb_users');
        const users = usersStr ? JSON.parse(usersStr) : [];

        const emailExists = users.some(
          (user) => user.email.toLowerCase() === userData.email.toLowerCase()
        );

        if (emailExists) {
          reject(new Error('An account with this email address already exists.'));
          return;
        }

        const newUser = {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
        };

        users.push(newUser);
        localStorage.setItem('sb_users', JSON.stringify(users));

        const sessionUser = {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
        };

        localStorage.setItem('sb_current_user', JSON.stringify(sessionUser));
        setUser(sessionUser);

        resolve({ success: true });
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('sb_current_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};