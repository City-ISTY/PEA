// Archivo: lib/models/models.dart
// Descripción: Centraliza todas las clases de modelo de datos de la aplicación.

// --- ENUMS ---
// FIX: Converted Dart enums to TypeScript string enums.
/// Enum para las cuatro habilidades clave evaluadas en el examen C2.
export enum Skill { 
  Reading = 'Reading', 
  Writing = 'Writing', 
  Listening = 'Listening', 
  Speaking = 'Speaking' 
}

/// Enum para los diferentes formatos de misiones que la IA puede generar.
export enum MissionType { 
  MultipleChoice = 'MultipleChoice', 
  Essay = 'Essay', 
  Monologue = 'Monologue', 
  Transcription = 'Transcription' 
}


// --- INTERFAZ BASE PARA PAYLOADS ---
// FIX: Converted Dart abstract class to a base interface.
export interface MissionPayload {}

// --- PAYLOADS ESPECÍFICOS ---
// FIX: Converted Dart classes to TypeScript interfaces.

/// Payload para una misión de opción múltiple (Lectura).
export interface MultipleChoicePayload extends MissionPayload {
  text: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

/// Payload para una misión de ensayo (Escritura).
export interface EssayPayload extends MissionPayload {
  prompt: string;
}

/// Payload para una misión de expresión oral (Hablar).
export interface SpeakingPayload extends MissionPayload {
  prompt: string;
}

/// Payload para una misión de comprensión auditiva (Escuchar).
export interface ListeningPayload extends MissionPayload {
  script: string;
  question: string;
}

// --- CLASE PRINCIPAL DE MISIÓN ---

/// Representa una única tarea o misión generada por la IA.
export interface Mission {
  id: string;
  skill: Skill;
  type: MissionType;
  payload: MissionPayload;
}


// --- MODELOS DE DATOS DEL USUARIO ---

/// Define la estructura para almacenar el progreso del usuario en cada habilidad.
// FIX: Converted Dart class to a TypeScript class with immutable update method.
export class UserProgress {
  readonly progress: Readonly<Record<Skill, number>>;

  constructor(progress: Record<Skill, number>) {
    this.progress = progress;
  }

  // Constructor de fábrica para el estado inicial.
  static initial({ allZero = false } = {}): UserProgress {
    return new UserProgress({
        [Skill.Reading]: allZero ? 0 : 25,
        [Skill.Writing]: allZero ? 0 : 10,
        [Skill.Listening]: allZero ? 0 : 45,
        [Skill.Speaking]: allZero ? 0 : 15,
      });
  }

  // Método para actualizar el progreso de forma inmutable.
  updateProgress(skill: Skill, amount: number): UserProgress {
    const newProgress = { ...this.progress };
    newProgress[skill] = Math.max(0, Math.min(100, (newProgress[skill] ?? 0) + amount));
    return new UserProgress(newProgress);
  }
}

/// Define la estructura para una sola entrada en la tabla de clasificación.
export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  isCurrentUser?: boolean;
}

// Clase para el resultado del feedback de la IA.
export interface FeedbackResult {
  isCorrect: boolean;
  text: string;
}
