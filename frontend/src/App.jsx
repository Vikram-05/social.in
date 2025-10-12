import React, { useEffect,useState } from 'react';
import { ThemeProvider } from './context/ThemeProvider';
import AppRoutes from './routes/AllRoutes';
import Preloader from './components/Preloader';

function App() {
  useEffect(() => { console.log("App") }, [])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;