import { useState } from 'react';
import TestButton from '../TestButton';
import HaniwaTest from '../HaniwaTest';

const ActiveThingTest = () => {
  const [activeTaskId, setActiveTaskId] = useState(null);

  const tasks = [
    { id: 1, text: "Let's DO it!" },
    { id: 2, text: "I'm gonna code" },
    { id: 3, text: 'I gotta tidy up!' },
    { id: 4, text: 'Happy!' },
    { id: 5, text: 'Coding Today!' },
    { id: 6, text: '🚚' },
  ];

  function getTaskClass(taskId) {
    return taskId === activeTaskId
      ? 'bg-teal-600 ring-1 ring-teal-400'
      : 'bg-gray-900 text-gray-500';
  }

  const activeTask = tasks.find((task) => task.id === activeTaskId);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 m-06 place-items-center">
      <h1 className="text-5xl">{activeTask && activeTask.text}</h1>
      <div>{activeTask && <HaniwaTest />}</div>
      <ul className="flex flex-col gap-4 m-6">
        {tasks.map((task) => (
          <li key={task.id} className="sm:w-full">
            <TestButton
              onClick={() => setActiveTaskId(task.id)}
              activeClass={getTaskClass(task.id)}
            >
              {task.text}
            </TestButton>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveThingTest;
