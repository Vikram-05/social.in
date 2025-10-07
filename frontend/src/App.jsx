import React from 'react';
import { ThemeProvider } from './context/ThemeProvider';
import AppRoutes from './routes/AllRoutes';

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;