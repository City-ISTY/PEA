// Archivo: screens/auth_screen.tsx (originalmente auth_screen.dart)
// Descripción: Pantalla para el inicio de sesión y registro de usuarios.

import React, { useState } from 'react';

interface AuthScreenProps {
  onLogin: (email: string, password: string) => void;
  onSignup: (name: string, email: string, password: string) => void;
}

// FIX: Converted from a StatefulWidget to a React functional component.
export const AuthScreen = ({ onLogin, onSignup }: AuthScreenProps) => {
  // FIX: Replaced Dart state variables and FormKey with useState hooks.
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // FIX: Replaced _trySubmit method with a standard form submission handler.
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    // Basic validation
    if (!email.includes('@')) {
      setError('Por favor, introduce un email válido.');
      return;
    }
    if (password.length < 7) {
      setError('La contraseña debe tener al menos 7 caracteres.');
      return;
    }

    if (isLogin) {
      onLogin(email, password);
    } else {
      if (name.trim() === '' && !isLogin) {
          setError('Por favor, introduce un nombre.');
          return;
      }
      onSignup(name, email, password);
    }
  };

  // FIX: Replaced Flutter's widget tree with JSX for the form structure.
  return (
    <div className="auth-screen">
      <div className="auth-card">
        <form onSubmit={handleSubmit}>
          <h2>ITSY English</h2>
          <p>{isLogin ? 'Inicia sesión para continuar' : 'Crea una cuenta para empezar'}</p>
          
          {!isLogin && (
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error-message">{error}</p>}
          
          <button type="submit">
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
          
          <button type="button" className="toggle-auth" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Crear nueva cuenta' : 'Ya tengo una cuenta'}
          </button>
        </form>
      </div>
    </div>
  );
};
