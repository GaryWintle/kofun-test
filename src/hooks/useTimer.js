import { useState, useEffect } from 'react';

function useTimer(initialSeconds) {
  const [count, setCount] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  function formatTime(count) {
    const hours = Math.floor(count / 3600);
    const minutes = Math.floor((count % 3600) / 60);
    const seconds = count % 60;

    const padded = (n) => String(n).padStart(2, '0');

    return `${padded(hours)}:${padded(minutes)}:${padded(seconds)}`;
  }

  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setCount(initialSeconds);
    setIsRunning(false);
  };

  return {
    displayTime: formatTime(count),
    isRunning,
    start,
    pause,
    reset,
  };
}

export default useTimer;
