'use client';
import { useState, useEffect } from "react";

const ScrollPositionIndicator: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const indicatorStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#000',
    color: '#fff',
    padding: '10px',
    textAlign: 'center',
    zIndex: 1000,
  };

  return (
    <div style={indicatorStyles}>
      Scroll Position: {scrollPosition}px
    </div>
  );
};

export default ScrollPositionIndicator;
