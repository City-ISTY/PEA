// Archivo: screens/home_screen.tsx (originalmente home_screen.dart)
// Descripción: La pantalla principal después de iniciar sesión, con navegación.

import React, { useState } from 'react';
import { UserProgress, Skill } from '../types';
import { DashboardScreen } from './Dashboard';
import { LeaderboardScreen } from './Leaderboard';

interface HomeScreenProps {
  userProgress: UserProgress;
  onStartMission: (skill: Skill) => void;
  currentUser: { name: string };
  onLogout: () => void;
}

// FIX: Converted from a StatefulWidget to a React functional component.
export const HomeScreen = ({
  userProgress,
  onStartMission,
  currentUser,
  onLogout,
}: HomeScreenProps) => {
  // FIX: Replaced state variable with React's useState hook for active tab.
  const [currentIndex, setCurrentIndex] = useState(0);

  // FIX: Replaced Flutter's Scaffold/AppBar/BottomNavigationBar with JSX and CSS classes for styling.
  return (
    <div className="home-screen">
      <header className="app-bar">
        <h1>ITSY English</h1>
        <div className="app-bar-actions">
          <span>¡Hola, {currentUser?.name ?? "Tú"}!</span>
          <button onClick={onLogout} title="Cerrar sesión" className="icon-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </button>
        </div>
      </header>
      
      <div className="screen-content">
        {/* FIX: Replaced IndexedStack with conditional rendering. */}
        {currentIndex === 0 && (
          <DashboardScreen
            userProgress={userProgress}
            onStartMission={onStartMission}
          />
        )}
        {currentIndex === 1 && <LeaderboardScreen />}
      </div>
      
      <nav className="bottom-nav">
        <button 
          className={currentIndex === 0 ? 'active' : ''} 
          onClick={() => setCurrentIndex(0)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          <span>Panel</span>
        </button>
        <button 
          className={currentIndex === 1 ? 'active' : ''} 
          onClick={() => setCurrentIndex(1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>
          <span>Clasificación</span>
        </button>
      </nav>
    </div>
  );
};
