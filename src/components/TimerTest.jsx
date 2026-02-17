import useTimer from '@/hooks/useTimer';

const TimerTest = () => {
  const { displayTime, isRunning, start, pause, reset } = useTimer(3600);

  return (
    <div className="m-12 grid place-content-center place-items-center">
      <h1 className="text-9xl my-12 ">{displayTime}</h1>
      <div className="flex gap-3">
        <button
          className={`${'text-2xl p-12 transition rounded-2xl'} ${!isRunning ? 'bg-green-900 hover:bg-green-500' : 'bg-orange-900 hover:bg-orange-500'}`}
          onClick={isRunning ? pause : start}
        >
          {!isRunning ? 'START' : 'PAUSE'}
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

export default TimerTest;
