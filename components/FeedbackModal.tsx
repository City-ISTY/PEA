// Archivo: widgets/feedback_dialog.tsx (originalmente feedback_dialog.dart)
// Descripción: Muestra un diálogo de feedback modal al usuario.

import React from 'react';
import { createRoot } from 'react-dom/client';
import { FeedbackResult } from '../types';

interface FeedbackModalProps {
  feedback: FeedbackResult;
  onClose: () => void;
  unmount: () => void;
}

const FeedbackModal = ({ feedback, onClose, unmount }: FeedbackModalProps) => {
  const isCorrect = feedback.isCorrect;
  const title = isCorrect ? '¡Correcto!' : 'Comentarios';
  // Using placeholders for icons
  const icon = isCorrect ? '✅' : 'ℹ️'; 
  const colorClass = isCorrect ? 'correct' : 'feedback';

  const handleClose = () => {
    onClose();
    unmount(); // Remove the modal from the DOM
  };

  return (
    // FIX: Replaced AlertDialog with a custom modal implementation using divs.
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3 className={`modal-title ${colorClass}`}>
          <span>{icon}</span>
          {title}
        </h3>
        <div className="modal-body">
          <p>{feedback.text}</p>
        </div>
        <div className="modal-actions">
          {/* FIX: Replaced TextButton with a standard button. */}
          <button onClick={handleClose}>
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

/// Muestra un diálogo con el feedback de la IA.
// FIX: Converted the function to dynamically render a React component into the DOM.
export const showFeedbackDialog = (feedback: FeedbackResult, onClose: () => void) => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);

  const unmount = () => {
    root.unmount();
    container.remove();
  };

  root.render(<FeedbackModal feedback={feedback} onClose={onClose} unmount={unmount} />);
};
