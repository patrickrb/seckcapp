import React from 'react';
import './SplashScreen.css';

interface SplashScreenProps {
  isVisible: boolean;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="splash-logo">
          <img 
            src="/images/bob.png" 
            alt="SecKC Logo" 
            className="splash-logo-image"
          />
        </div>
        <div className="splash-text">
          <h1>SecKC</h1>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;