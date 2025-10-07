import React, { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeProvider';
import AppRoutes from './routes/AllRoutes';

function App() {
  useEffect(()=>{console.log("App")},[])
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;