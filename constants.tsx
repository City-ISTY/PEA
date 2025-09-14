// Archivo: lib/constants/app_data.dart
// Descripción: Almacena constantes y datos estáticos de la aplicación.

import { Skill, LeaderboardEntry } from './types';

// --- TRADUCCIONES ---

/// Mapea cada habilidad a su traducción en español.
// FIX: Converted Dart Map to TypeScript Record for type safety.
export const SKILL_TRANSLATIONS: Record<Skill, string> = {
  [Skill.Reading]: 'Lectura',
  [Skill.Writing]: 'Escritura',
  [Skill.Listening]: 'Comprensión Auditiva',
  [Skill.Speaking]: 'Expresión Oral',
};

// --- DATOS DE CLASIFICACIÓN (MOCK) ---

/// Datos de muestra para la clasificación global.
// FIX: Converted Dart List to a typed TypeScript array.
export const GLOBAL_LEADERBOARD_DATA: LeaderboardEntry[] = [
  { rank: 1, name: 'Alex Johnson', score: 12500 },
  { rank: 2, name: 'Maria Garcia', score: 11800 },
  { rank: 3, name: 'Chen Wei', score: 11250 },
  { rank: 4, name: 'Tú', score: 10980, isCurrentUser: true },
  { rank: 5, name: 'Fatima Al-Sayed', score: 10500 },
  { rank: 6, name: 'David Smith', score: 9800 },
  { rank: 7, name: 'Yuki Tanaka', score: 9500 },
];

/// Datos de muestra para la liga de amigos.
export const FRIENDS_LEAGUE_DATA: LeaderboardEntry[] = [
  { rank: 1, name: 'Sarah Miller', score: 11500 },
  { rank: 2, name: 'Tú', score: 10980, isCurrentUser: true },
  { rank: 3, name: 'Ben Carter', score: 10200 },
  { rank: 4, name: 'Olivia Chen', score: 9600 },
];


// --- CADENAS DE ICONOS SVG ---
// Usamos un componente para renderizarlos y aplicar color.

const _readingIconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v11.494m-5.25-8.494v5.242c0 1.25.993 2.25 2.242 2.25h6.016c1.25 0 2.242-1.002 2.242-2.25V9.253" />
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.75 18.75h14.5" />
</svg>
`;

const _writingIconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
</svg>
`;

const _listeningIconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.108 12 5v14c0 .892-1.077 1.337-1.707.707L5.586 15z" />
</svg>
`;

const _speakingIconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
</svg>
`;

/// Mapea cada habilidad a la cadena de su icono SVG.
export const SKILL_ICONS_SVG: Record<Skill, string> = {
  [Skill.Reading]: _readingIconSvg,
  [Skill.Writing]: _writingIconSvg,
  [Skill.Listening]: _listeningIconSvg,
  [Skill.Speaking]: _speakingIconSvg,
};
