import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const InactivityHandler = ({ timeoutMinutes = 1 }) => {
  const navigate = useNavigate();
  const timeoutId = useRef(null);

  const resetTimer = () => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      navigate('/');
    }, timeoutMinutes * 60 * 1000);
  };

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'click'];

    events.forEach(event => window.addEventListener(event, resetTimer));
    resetTimer(); 

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      clearTimeout(timeoutId.current);
    };
  }, []);

  return null;
};

export default InactivityHandler;