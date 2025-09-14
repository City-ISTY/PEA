// Archivo: screens/mission_screen.tsx (originalmente mission_screen.dart)
// Descripción: Pantalla que muestra la misión activa y maneja la interacción del usuario.

import React, { useState, useEffect, useRef } from 'react';
import { Mission, Skill, MultipleChoicePayload, ListeningPayload, SpeakingPayload, EssayPayload } from '../types';
import { SKILL_TRANSLATIONS } from '../constants';
import { Loader } from './Loader';

// FIX: Add minimal TypeScript definitions for the Web Speech API to resolve compile error.
interface SpeechRecognition {
  continuous: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}
interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
}
interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}
interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
}
interface SpeechRecognitionAlternative {
  transcript: string;
}

interface MissionScreenProps {
  mission: Mission;
  onSubmit: (mission: Mission, answer: any) => void;
  isLoading: boolean;
  onBack: () => void;
}

// FIX: Converted from a StatefulWidget to a React functional component.
export const MissionScreen = ({ mission, onSubmit, isLoading, onBack }: MissionScreenProps) => {
  // --- ESTADO LOCAL ---
  // FIX: Replaced Dart state variables with useState hooks.
  const [answer, setAnswer] = useState<any>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [isListening, setIsListening] = useState(false);

  // --- PLUGINS DE VOZ (Web Speech API) ---
  // FIX: Replaced Flutter speech plugins with refs for Web Speech API instances.
  const speechRecognition = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Reset local state when mission changes
    setAnswer(null);
    setTextAnswer('');
    setIsListening(false);

    if (mission.skill === Skill.Speaking) {
      // FIX: Replaced dart _initSpeech with Web Speech API initialization in useEffect.
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognitionAPI) {
        speechRecognition.current = new SpeechRecognitionAPI();
        speechRecognition.current.continuous = true;
        speechRecognition.current.lang = 'en-US';
        speechRecognition.current.onresult = (event) => {
          setTextAnswer(event.results[event.results.length - 1][0].transcript);
        };
        speechRecognition.current.onend = () => {
          setIsListening(false);
        };
      } else {
        console.warn("Speech Recognition API is not supported in this browser.");
      }
    }

    // Cleanup function
    return () => {
      if (speechRecognition.current) {
        speechRecognition.current.stop();
      }
      window.speechSynthesis.cancel();
    };
  }, [mission]);

  const toggleListening = () => {
    if (isListening) {
      speechRecognition.current?.stop();
      setIsListening(false);
    } else {
      setTextAnswer('');
      speechRecognition.current?.start();
      setIsListening(true);
    }
  };

  // FIX: Replaced flutter_tts with Web Speech Synthesis API.
  const speak = (text: string) => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };
  
  const handleSubmit = () => {
    const finalAnswer = mission.skill === Skill.Reading ? answer : textAnswer;
    onSubmit(mission, finalAnswer);
  };

  const isSubmitDisabled = () => {
    if (isLoading) return true;
    if (mission.skill === Skill.Reading) {
      return answer === null;
    }
    return textAnswer.trim() === '';
  };

  /// Construye la UI específica para cada tipo de misión.
  // FIX: Replaced Dart build method with a function returning JSX.
  const renderMissionContent = () => {
    const { payload, skill } = mission;
    switch (skill) {
      case Skill.Reading: {
        const mcPayload = payload as MultipleChoicePayload;
        return (
          <div>
            <p>{mcPayload.text}</p>
            <h4>{mcPayload.question}</h4>
            <div className="multiple-choice-options">
              {mcPayload.options.map((option, index) => (
                // FIX: Replaced RadioListTile with standard HTML radio inputs.
                <label key={index}>
                  <input
                    type="radio"
                    name="mission-answer"
                    value={index}
                    checked={answer === index}
                    onChange={(e) => setAnswer(parseInt(e.target.value, 10))}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        );
      }
      
      case Skill.Listening: {
        const liPayload = payload as ListeningPayload;
        return (
          <div className="mission-content-centered">
            <h4>{liPayload.question}</h4>
            <button onClick={() => speak(liPayload.script)}>Reproducir Audio</button>
            <textarea value={textAnswer} onChange={(e) => setTextAnswer(e.target.value)} rows={5} placeholder="Escribe tu respuesta aquí..." />
          </div>
        );
      }

      case Skill.Speaking: {
        const spPayload = payload as SpeakingPayload;
        return (
          <div className="mission-content-centered">
            <h4>{spPayload.prompt}</h4>
            <button onClick={toggleListening} disabled={!speechRecognition.current} className={isListening ? 'stop-listening' : ''}>
              {isListening ? "Detener Grabación" : "Comenzar a Grabar"}
            </button>
            <textarea value={textAnswer} readOnly rows={5} placeholder="Tu transcripción aparecerá aquí..." />
          </div>
        );
      }

      case Skill.Writing: {
        const wrPayload = payload as EssayPayload;
        return (
          <div className="mission-content-centered">
            <h4>{wrPayload.prompt}</h4>
            <textarea value={textAnswer} onChange={(e) => setTextAnswer(e.target.value)} rows={10} placeholder="Escribe tu ensayo aquí..." />
          </div>
        );
      }
      default:
        return <div>Tipo de misión no soportado.</div>;
    }
  };

  // FIX: Replaced Flutter Scaffold/AppBar with JSX.
  return (
    <div className="mission-screen">
      <header className="app-bar">
        <button onClick={onBack}>&larr;</button>
        <h2>Misión de {SKILL_TRANSLATIONS[mission.skill]}</h2>
      </header>
      <div className="mission-body">
        {renderMissionContent()}
        <button onClick={handleSubmit} disabled={isSubmitDisabled()}>
          {isLoading ? <Loader message="Analizando..." /> : 'Enviar Respuesta'}
        </button>
      </div>
    </div>
  );
};
