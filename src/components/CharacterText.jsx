'use client';

import { useState } from 'react';
import HaniwaTest from './HaniwaTest';

const CharacterText = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [task, setTask] = useState('');
  const [encouragement, setEncouragement] = useState(null);

  async function getEncouragement() {
    if (!task.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/encourage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskName: task }),
      });

      const data = await response.json();
      setEncouragement(data.message);
    } catch (err) {
      setError('Failed to get encouragement');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-8 flex flex-col gap-6 items-center">
      {isLoading && <p>Haniwa is thinking... 🤔</p>}

      {error && <p className="text-red-600">{error}</p>}

      {encouragement && !isLoading && (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-md text-center">
          <p className="text-lg">{encouragement}</p>
        </div>
      )}
      <HaniwaTest />

      <div className="flex gap-3">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="What are you working on?"
          className="p-3 border rounded-lg w-64"
        />
        <button
          onClick={getEncouragement}
          disabled={isLoading || !task.trim()}
          className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-700 disabled:bg-gray-400"
        >
          {isLoading ? 'Thinking...' : 'Ask Haniwa'}
        </button>
      </div>
    </div>
  );
};

export default CharacterText;
