import useReducerTimer from '@/hooks/useReducerTimer';

const ReducerTimerTest = () => {
  const { displayTime, state, start, pause, reset } = useReducerTimer(3600);

  return (
    <div className="m-12 grid place-content-center place-items-center">
      <h1 className="text-9xl my-12 ">{displayTime}</h1>
      <div className="flex gap-3">
        <button
          className={`${'text-2xl p-12 transition rounded-2xl'} ${!state.isRunning ? 'bg-green-900 hover:bg-green-500' : 'bg-orange-900 hover:bg-orange-500'}`}
          onClick={state.isRunning ? pause : start}
        >
          {!state.isRunning ? 'START' : 'PAUSE'}
        </button>

        <button
          className="text-2xl p-12 bg-blue-900 hover:bg-blue-500 transition rounded-2xl"
          onClick={reset}
        >
          RESET
        </button>
      </div>
    </div>
  );
};

export default ReducerTimerTest;
