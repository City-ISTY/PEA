// Archivo: widgets/skill_progress_card.tsx (originalmente skill_progress_card.dart)
// Descripción: Widget para mostrar el progreso de una habilidad con una barra circular.

import React from 'react';
import { Skill } from '../types';
import { SKILL_TRANSLATIONS, SKILL_ICONS_SVG } from '../constants';

interface SkillProgressCardProps {
  skill: Skill;
  percentage: number;
  onStartMission: () => void;
}

// FIX: Converted from a StatelessWidget to a React functional component.
export const SkillProgressCard = ({ skill, percentage, onStartMission }: SkillProgressCardProps) => {

  // Mapea cada habilidad a un color específico para la UI.
  const getSkillColor = () => {
    switch (skill) {
      case Skill.Reading: return '#38bdf8'; // Sky-400
      case Skill.Writing: return '#fbbf24'; // Amber-400
      case Skill.Listening: return '#a78bfa'; // Violet-400
      case Skill.Speaking: return '#f43f5e'; // Rose-400
      default: return 'grey';
    }
  };

  const skillColor = getSkillColor();
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    // FIX: Replaced Flutter's Card widget with a div styled via CSS.
    <div className="skill-card">
      <div className="progress-circle-container">
        {/* FIX: Replaced CircularProgressIndicator with an SVG implementation for web. */}
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle
            cx="60" cy="60" r={radius}
            strokeWidth="8"
            stroke="rgba(255, 255, 255, 0.1)"
            fill="transparent"
          />
          <circle
            cx="60" cy="60" r={radius}
            strokeWidth="8"
            stroke={skillColor}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
          />
        </svg>
        <div className="progress-circle-text">
          {percentage}%
        </div>
      </div>
      
      <div className="skill-title">
        {/* FIX: Replaced SvgPicture.string with a div and dangerouslySetInnerHTML, controlling color via CSS. */}
        <div
          className="skill-icon"
          style={{ color: skillColor }}
          dangerouslySetInnerHTML={{ __html: SKILL_ICONS_SVG[skill] }}
        />
        <h3>{SKILL_TRANSLATIONS[skill]}</h3>
      </div>
      
      <div className="card-spacer" />
      
      {/* FIX: Replaced ElevatedButton with a standard button element. */}
      <button className="start-mission-button" onClick={onStartMission}>
        Comenzar Misión
      </button>
    </div>
  );
};
