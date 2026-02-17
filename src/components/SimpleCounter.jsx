import { useState } from 'react';

const SimpleCounter = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="grid bg-gray-800 h-screen text-9xl md:grid-cols-3">
      <button
        className="text-9xl hover:bg-red-900 active:bg-red-800 transition ease-in"
        onClick={() => {
          setCounter((prev) => prev - 1);
        }}
      >
        -
      </button>
      <div className="bg-gray-400 w-full h-full grid place-items-center">
        <span className=" text-9xl text-gray-800">{counter}</span>
      </div>
      <button
        className=" text-9xl hover:bg-teal-900 active:bg-teal-800 transition ease-in"
        onClick={() => {
          setCounter((prev) => prev + 1);
        }}
      >
        +
      </button>
    </div>
  );
};

export default SimpleCounter;
