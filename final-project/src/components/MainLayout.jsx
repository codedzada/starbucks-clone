import React, { useState, useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import Navbar from '../features/navigation/Navbar';
import Footer from '../features/navigation/Footer';

const MainLayout = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setProgress(20);

    const timer1 = setTimeout(() => setProgress(60), 200);
    const timer2 = setTimeout(() => setProgress(100), 400);

    const timer3 = setTimeout(() => {
      setIsLoading(false);
      setProgress(0);
    }, 600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [location.pathname]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-[4px] bg-[#006241] z-[10000] transition-all duration-300 ease-out shadow-[0_0_10px_#006241] pointer-events-none ${
          isLoading ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ width: `${progress}%` }}
      />

      {isLoading && <LoadingSpinner />}

      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;