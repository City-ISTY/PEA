// Archivo: index.tsx
// Descripción: El punto de entrada principal de la aplicación React.

import React, { useState, useMemo, createContext } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

// User type for authentication context
type User = {
  name: string;
};

// Type for the authentication context value
type AuthContextType = {
  currentUser: User | null;
  login: (name: string) => void;
  logout: () => void;
};

// Create a context to hold authentication data and functions.
// FIX: Replaced Flutter's Provider with React Context for state management.
export const AuthContext = createContext<AuthContextType | null>(null);

// This component provides authentication state to the entire app.
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = (name: string) => {
    setCurrentUser({ name: name || "Tú" });
  };

  const logout = () => {
    setCurrentUser(null);
  };
  
  // useMemo ensures the context value object is stable between re-renders.
  const value = useMemo(() => ({
    currentUser,
    login,
    logout,
  }), [currentUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


const C2AICoachApp = () => {
  return (
    // FIX: Replaced ChangeNotifierProvider with a custom AuthProvider component using React Context.
    <AuthProvider>
      {/* 
        This is a simplified representation of Flutter's MaterialApp and ThemeData.
        In a real React app, this would be handled by a CSS-in-JS library like Emotion 
        or global CSS for theming. For this fix, styles are applied directly or via CSS classes.
      */}
      <div className="c2-ai-coach-app">
        <App />
      </div>
    </AuthProvider>
  );
};

// Mount the app to the DOM
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <C2AICoachApp />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}