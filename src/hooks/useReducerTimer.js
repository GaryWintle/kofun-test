import { useEffect, useReducer } from 'react';

function timerReducer(state, action) {
  switch (action.type) {
    case 'START':
      return { ...state, isRunning: true };
    case 'PAUSE':
      return { ...state, isRunning: false };
    case 'RESET':
      return { ...state, isRunning: false, count: action.payload };
    case 'TICK':
      return { ...state, isRunning: true, count: state.count - 1 };
    default:
      return state;
  }
}

function useReducerTimer(initialSeconds) {
  const [state, dispatch] = useReducer(timerReducer, {
    count: initialSeconds,
    isRunning: false,
  });

  function formatTime(count) {
    const hours = Math.floor(count / 3600);
    const minutes = Math.floor((count % 3600) / 60);
    const seconds = count % 60;

    const padded = (n) => String(n).padStart(2, '0');

    return `${padded(hours)}:${padded(minutes)}:${padded(seconds)}`;
  }

  useEffect(() => {
    if (!state.isRunning) return;

    const id = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, 1000);

    return () => clearInterval(id);
  }, [state.isRunning]);

  const start = () => dispatch({ type: 'START' });
  const pause = () => dispatch({ type: 'PAUSE' });
  const reset = () => dispatch({ type: 'RESET', payload: initialSeconds });

  return {
    displayTime: formatTime(state.count),
    state,
    start,
    pause,
    reset,
  };
}

export default useReducerTimer;
