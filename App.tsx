// Archivo: lib/app.dart
// Descripción: El widget raíz que gestiona el estado y la lógica principal de la app.

import React, { useState, useEffect, useContext } from 'react';
import { UserProgress, Mission, Skill, FeedbackResult } from './types';
import { GeminiService } from './services/geminiService';
import { AuthScreen } from './components/Auth';
import { HomeScreen } from './components/Header';
import { MissionScreen } from './components/MissionView';
import { Loader } from './components/Loader';
import { showFeedbackDialog } from './components/FeedbackModal';
import { AuthContext } from './index';

// FIX: Converted from a StatefulWidget to a React functional component.
const App = () => {
  const authContext = useContext(AuthContext);

  // --- ESTADO ---
  // FIX: Replaced Dart state variables with React's useState hook.
  const [userProgress, setUserProgress] = useState<UserProgress>(() => UserProgress.initial());
  const [currentMission, setCurrentMission] = useState<Mission | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);
  const [geminiService, setGeminiService] = useState<GeminiService | null>(null);

  // --- INICIALIZACIÓN ---
  // FIX: Replaced initState with useEffect for component initialization.
  useEffect(() => {
    // FIX: Replaced Dart's String.fromEnvironment with process.env, as per guidelines.
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      // It is crucial to have the API Key for the app to function.
      console.error('API_KEY not provided. It must be set in the environment variables.');
      alert('API_KEY no fue proporcionada. La aplicación no puede funcionar.');
      return;
    }
    setGeminiService(new GeminiService(apiKey));
  }, []);
  
  // --- LÓGICA DE LA MISIÓN ---
  // FIX: Converted Dart Future methods to async TypeScript functions.
  const startMission = async (skill: Skill) => {
    if (!geminiService) return;
    // FIX: Replaced setState with direct state setter calls.
    setIsLoading(true);
    setCurrentMission(null);
    try {
      const mission = await geminiService.generateMission(skill, userProgress.progress[skill]!);
      setCurrentMission(mission);
    } catch (e) {
      // Shows an error if the mission cannot be generated.
      alert(`Error al generar misión: ${e instanceof Error ? e.message : String(e)}`);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const submitMission = async (mission: Mission, answer: any) => {
    if (!geminiService) return;
    setIsLoading(true);
    setFeedback(null);
    try {
      const feedbackResult = await geminiService.getFeedback(mission, answer);
      setFeedback(feedbackResult);
      // If the answer is correct, update progress.
      if (feedbackResult.isCorrect) {
        setUserProgress(prev => prev.updateProgress(mission.skill, 5));
      }
    } catch (e) {
      console.error("Error getting feedback:", e);
      // Shows an error if feedback cannot be obtained.
      setFeedback({
        isCorrect: false,
        text: 'Lo sentimos, ocurrió un error al obtener la retroalimentación. Por favor, inténtalo de nuevo.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const closeFeedbackAndReturn = () => {
    setFeedback(null);
    setCurrentMission(null);
  };

  const goBackToDashboard = () => {
    setCurrentMission(null);
  };
  
  // --- LÓGICA DE RENDERIZADO ---
  // FIX: Replaced Flutter's post-frame callback with a useEffect hook to handle side-effects like showing a dialog.
  useEffect(() => {
    if (feedback) {
      showFeedbackDialog(feedback, closeFeedbackAndReturn);
    }
  }, [feedback]);


  if (!authContext) {
    return <Loader message="Inicializando autenticación..." />;
  }
  
  const { currentUser, login, logout } = authContext;

  // FIX: Replaced Flutter's Consumer with React's standard conditional rendering.
  if (!currentUser) {
    return (
      <AuthScreen
        onLogin={(email, password) => {
          // In a real app, you would validate credentials here.
          login("Tú");
        }}
        onSignup={(name, email, password) => {
          // On signup, progress starts at 0.
          setUserProgress(UserProgress.initial({ allZero: true }));
          login(name);
        }}
      />
    );
  }

  // Determine which screen to show.
  // FIX: Replaced Flutter's build method and widgets with JSX and conditional rendering.
  let content;
  if (isLoading && !currentMission) {
    content = <Loader message="Generando tu misión..." />;
  } else if (currentMission) {
    content = (
      <MissionScreen
        mission={currentMission}
        onSubmit={submitMission}
        isLoading={isLoading}
        onBack={goBackToDashboard}
      />
    );
  } else {
    content = (
      <HomeScreen
        userProgress={userProgress}
        onStartMission={startMission}
        currentUser={currentUser}
        onLogout={logout}
      />
    );
  }

  return (
    <main>
      {content}
    </main>
  );
};

export default App;
