// Archivo: lib/services/gemini_service.dart
// Descripción: Servicio para interactuar con la API de Google Gemini.

import { GoogleGenAI } from "@google/genai";
import { Skill, Mission, MissionType, MissionPayload, MultipleChoicePayload, EssayPayload, ListeningPayload, SpeakingPayload, FeedbackResult } from '../types';

export class GeminiService {
  // FIX: Switched from the Dart GenerativeModel to the JS GoogleGenAI client.
  private readonly ai: GoogleGenAI;

  constructor(apiKey: string) {
    // FIX: Initialized the client as per the guidelines.
    if (!apiKey) {
      throw new Error("API key is required for GeminiService");
    }
    this.ai = new GoogleGenAI({ apiKey });
  }

  /// Construye el "prompt" para que la IA genere una misión.
  // FIX: Corrected string interpolation from Dart ($var) to JS/TS (${var}).
  private _getMissionPrompt(skill: Skill, userLevel: number): string {
    const basePrompt =
        `Eres una IA examinadora de inglés de nivel C2. Tu tarea es generar una misión desafiante para un estudiante que se prepara para la certificación C2. La competencia actual del estudiante en ${skill} es de ${userLevel}/100. Adapta la dificultad en consecuencia. La respuesta DEBE ser un objeto JSON válido que coincida con la estructura solicitada. No incluyas '\`\`\`json' o cualquier otro formato markdown en la respuesta.`;

    switch (skill) {
      case Skill.Reading:
        return `${basePrompt} Genera una misión de 'Lectura'. Debe ser una pregunta de opción múltiple basada en un texto corto y complejo en inglés. La pregunta, sin embargo, debe estar en español. El JSON debe tener esta estructura: {'text': '...', 'question': '...', 'options': ['...'], 'correctAnswerIndex': 0}.`;
      case Skill.Writing:
        return `${basePrompt} Genera una misión de 'Escritura'. Debe ser una consigna de ensayo en español. El JSON debe tener esta estructura: {'prompt': '...'}.`;
      case Skill.Listening:
        return `${basePrompt} Genera una misión de 'Comprensión Auditiva'. Debe incluir un 'script' en inglés y una 'pregunta' en español. El JSON debe tener esta estructura: {'script': '...', 'question': '...'}.`;
      case Skill.Speaking:
        return `${basePrompt} Genera una misión de 'Expresión Oral'. Debe ser una consigna en español para un monólogo corto. El JSON debe tener esta estructura: {'prompt': '...'}.`;
    }
  }

  /// Genera una nueva misión llamando a la API de Gemini.
  // FIX: Rewrote method with modern async/await and correct API calls.
  async generateMission(skill: Skill, userLevel: number): Promise<Mission> {
    const prompt = this._getMissionPrompt(skill, userLevel);
    
    // FIX: Updated to the correct @google/genai API call structure.
    const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        },
    });

    // FIX: Used standard JSON.parse for the response text.
    const jsonResponse = JSON.parse(response.text);

    let missionType: MissionType;
    let payload: MissionPayload;

    switch (skill) {
      case Skill.Reading:
        missionType = MissionType.MultipleChoice;
        payload = jsonResponse as MultipleChoicePayload;
        break;
      case Skill.Writing:
        missionType = MissionType.Essay;
        payload = jsonResponse as EssayPayload;
        break;
      case Skill.Listening:
        missionType = MissionType.Transcription;
        payload = jsonResponse as ListeningPayload;
        break;
      case Skill.Speaking:
        missionType = MissionType.Monologue;
        payload = jsonResponse as SpeakingPayload;
        break;
    }

    return {
      id: `mission-${Date.now()}`,
      skill: skill,
      type: missionType,
      payload: payload,
    };
  }

  /// Obtiene feedback sobre la respuesta de un usuario.
  async getFeedback(mission: Mission, answer: any): Promise<FeedbackResult> {
    let prompt: string;
    let isCorrect = false;

    if (mission.type === MissionType.MultipleChoice) {
      const payload = mission.payload as MultipleChoicePayload;
      isCorrect = (answer === payload.correctAnswerIndex);
      const userAnswerText = payload.options[answer as number];
      const correctAnswerText = payload.options[payload.correctAnswerIndex];
      // FIX: Changed Dart's """ multi-line string to JS backticks and fixed interpolation.
      prompt = `
        Un estudiante de inglés C2 recibió esta tarea de comprensión lectora:
        Texto: "${payload.text}"
        Pregunta: "${payload.question}"
        Opciones: ${JSON.stringify(payload.options)}
        Respuesta Correcta: "${correctAnswerText}"
        El estudiante eligió: "${userAnswerText}".
        Su respuesta fue ${isCorrect ? 'correcta' : 'incorrecta'}. 
        Proporciona feedback conciso y alentador en español. Si es correcta, elógialo y explica brevemente por qué. Si es incorrecta, explica suavemente el error y apunta a la lógica correcta. Mantén el feedback por debajo de 100 palabras. Comienza con "¡Correcto!" o "No es del todo correcto.".
      `;
    } else {
      isCorrect = true; // For open-ended answers, we grant progress and focus on qualitative feedback.
      let consigna: string;
      if (mission.skill === Skill.Listening) {
        consigna = (mission.payload as ListeningPayload).question;
      } else {
        consigna = (mission.payload as (EssayPayload | SpeakingPayload)).prompt;
      }
      prompt = `
        Un estudiante de inglés C2 recibió esta tarea de ${mission.skill}:
        Consigna: "${consigna}"
        Su respuesta fue: "${answer}"
        Proporciona feedback conciso y constructivo en español sobre su respuesta. Analiza gramática, vocabulario, coherencia y cumplimiento de la tarea. Ofrece ejemplos específicos para mejorar. Mantenlo por debajo de 150 palabras. Comienza con una frase resumen como "Excelente trabajo", "Un buen intento" o "Un comienzo sólido".
      `;
    }

    // FIX: Updated to the correct @google/genai API call structure.
    const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    return { isCorrect, text: response.text ?? "No se pudo generar el feedback." };
  }
}
