import { useState, useReducer } from 'react';

function tasksReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.payload];
    case 'DELETE_TASK':
      return state.filter((_, index) => index !== action.payload);
    case 'MOVE_TASK_UP':
      if (action.payload > 0) {
        const updated = [...state];
        [updated[action.payload], updated[action.payload - 1]] = [
          updated[action.payload - 1],
          updated[action.payload],
        ];
        return updated;
      }
      return state;
    case 'MOVE_TASK_DOWN':
      if (action.payload < state.length - 1) {
        const updated = [...state];
        [updated[action.payload], updated[action.payload + 1]] = [
          updated[action.payload + 1],
          updated[action.payload],
        ];
        return updated;
      }
      return state;
  }
}

const ToDoList = () => {
  const [tasks, dispatch] = useReducer(tasksReducer, [
    'eat',
    'laundry',
    'walk aphie',
  ]);
  const [newTask, setNewTask] = useState('');

  function handleInputChange(e) {
    setNewTask(e.target.value);
  }
  function addTask() {
    if (!newTask) return;
    dispatch({ type: 'ADD_TASK', payload: newTask });
    setNewTask('');
  }
  function deleteTask(index) {
    dispatch({ type: 'DELETE_TASK', payload: index });
  }
  function moveTaskUp(index) {
    dispatch({ type: 'MOVE_TASK_UP', payload: index });
  }
  function moveTaskDown(index) {
    dispatch({ type: 'MOVE_TASK_DOWN', payload: index });
  }

  return (
    <div className="grid place-content-center bg-gray-900 my-8 p-8 w-2/4 gap-6">
      <h1 className="text-6xl py-4">My Todos!</h1>
      <div className="flex gap-3">
        <input
          className="p-3 bg-gray-700 rounded-md"
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="p-2 bg-amber-600 rounded-xl" onClick={addTask}>
          Add
        </button>
      </div>
      <ol className="flex flex-col gap-6">
        {tasks.map((task, index) => (
          <li className="flex gap-3 align-content-center" key={index}>
            <span className="text-2xl px-3 py-2">{task}</span>
            <button
              className="bg-red-400 py-1 px-2 rounded-md"
              onClick={() => deleteTask(index)}
            >
              Delete
            </button>
            <button
              className="bg-red-400 py-1 px-2 rounded-md"
              onClick={() => moveTaskUp(index)}
            >
              👆
            </button>
            <button
              className="bg-red-400 py-1 px-2 rounded-md"
              onClick={() => moveTaskDown(index)}
            >
              👇
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ToDoList;
