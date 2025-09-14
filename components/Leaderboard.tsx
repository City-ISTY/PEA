// Archivo: screens/leaderboard_screen.tsx (originalmente leaderboard_screen.dart)
// Descripción: Muestra la clasificación global y de amigos en una interfaz con pestañas.

import React, { useState } from 'react';
import { LeaderboardEntry } from '../types';
import { GLOBAL_LEADERBOARD_DATA, FRIENDS_LEAGUE_DATA } from '../constants';

type Tab = 'global' | 'friends';

// FIX: Converted from a StatelessWidget to a React functional component.
export const LeaderboardScreen = () => {
  // FIX: Replaced DefaultTabController with useState for tab management.
  const [activeTab, setActiveTab] = useState<Tab>('global');

  return (
    // FIX: Replaced Scaffold/AppBar/TabBar with JSX and CSS classes.
    <div className="leaderboard-screen">
      <div className="leaderboard-header">
          <h2>Clasificación</h2>
          <div className="tab-bar">
            <button 
              className={activeTab === 'global' ? 'active' : ''}
              onClick={() => setActiveTab('global')}
            >
              Global
            </button>
            <button
              className={activeTab === 'friends' ? 'active' : ''}
              onClick={() => setActiveTab('friends')}
            >
              Liga de Amigos
            </button>
          </div>
      </div>
      
      {/* FIX: Replaced TabBarView with conditional rendering. */}
      <div className="tab-content">
        {activeTab === 'global' && <LeaderboardList data={GLOBAL_LEADERBOARD_DATA} />}
        {activeTab === 'friends' && <LeaderboardList data={FRIENDS_LEAGUE_DATA} />}
      </div>
    </div>
  );
};

/// Widget interno para renderizar una lista de clasificación.
const LeaderboardList = ({ data }: { data: LeaderboardEntry[] }) => {
  return (
    // FIX: Replaced ListView.builder with a simple list and .map().
    <ul className="leaderboard-list">
      {data.map((entry) => {
        const isCurrentUser = entry.isCurrentUser;
        // FIX: Replaced ListTile with a semantic `li` element.
        return (
          <li key={entry.rank} className={isCurrentUser ? 'current-user' : ''}>
            <span className="rank">{entry.rank}</span>
            <span className="name">{entry.name}{isCurrentUser ? ' (Tú)' : ''}</span>
            <span className="score">{entry.score} pts</span>
          </li>
        );
      })}
    </ul>
  );
};
