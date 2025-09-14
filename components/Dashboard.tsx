// Archivo: screens/dashboard_screen.tsx (originalmente dashboard_screen.dart)
// Descripción: Muestra el panel principal con el progreso del usuario por habilidad.

import React from 'react';
import { UserProgress, Skill } from '../types';
import { SkillProgressCard } from './SkillProgress';

interface DashboardScreenProps {
  userProgress: UserProgress;
  onStartMission: (skill: Skill) => void;
}

// FIX: Converted from a StatelessWidget to a React functional component.
export const DashboardScreen = ({ userProgress, onStartMission }: DashboardScreenProps) => {
  
  // FIX: Replaced Flutter's responsive logic with a CSS-driven approach.
  // The grid layout is now defined in a corresponding CSS file for better separation of concerns.
  return (
    // FIX: Replaced SingleChildScrollView/Column with standard div and semantic tags.
    <div className="dashboard-container">
      <section className="dashboard-header">
        <h2>ITSY English</h2>
        <p>Aquí está el resumen de tu progreso. Selecciona una habilidad para comenzar una nueva misión.</p>
      </section>
      
      {/* FIX: Replaced GridView.builder with a div and a .map() call for rendering items. */}
      <div className="skills-grid">
        {(Object.keys(Skill) as Array<keyof typeof Skill>).map((skillKey) => {
          const skill = Skill[skillKey];
          return (
            <SkillProgressCard
              key={skill}
              skill={skill}
              percentage={userProgress.progress[skill] ?? 0}
              onStartMission={() => onStartMission(skill)}
            />
          );
        })}
      </div>
    </div>
  );
};