import React, { useState, useCallback } from 'react';
import { useLenis } from './hooks/useLenis';
import BackgroundGlow from './components/effects/BackgroundGlow';
import TextureOverlay from './components/effects/TextureOverlay';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PageLoader from './components/layout/PageLoader';
import Home from './pages/Home';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  const handleLoadComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && <PageLoader onComplete={handleLoadComplete} />}
      <div className={`relative min-h-screen ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}>
        <BackgroundGlow />
        <TextureOverlay />
        <Navbar />
        <main className="relative z-10">
          <Home />
        </main>
        <Footer />
        <Chatbot />
      </div>
    </>
  );
};

export default App;
