// Archivo: widgets/loader.tsx (originalmente loader.dart)
// Descripción: Widget reutilizable para mostrar un indicador de carga.

import React from 'react';

interface LoaderProps {
  message?: string;
}

// FIX: Converted from a StatelessWidget to a React functional component.
export const Loader = ({ message = "Cargando..." }: LoaderProps) => {
  return (
    // FIX: Replaced Flutter's Center/Column/CircularProgressIndicator with JSX and CSS classes.
    <div className="loader-container">
      <div className="spinner" />
      <p>{message}</p>
    </div>
  );
};
