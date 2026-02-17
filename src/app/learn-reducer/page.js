'use client';

import { useReducer, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

// ─── Counter Reducer ────────────────────────────────────────────────
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

// ─── Todo Reducer ───────────────────────────────────────────────────
// STEP 2: This function receives EVERY dispatch call.
// React automatically passes it two things:
//   - state: the current todos array (React keeps track of this for you)
//   - action: the exact object YOU passed to dispatch(), e.g. { type: 'toggle', id: 3 }
function todoReducer(state, action) {
  // STEP 3: We look at action.type to decide what to do.
  // Remember, action is just the object we sent: { type: 'toggle', id: 3 }
  // So action.type is 'toggle', and action.id is 3.
  switch (action.type) {
    case 'add':
      // action looks like: { type: 'add', text: 'Buy milk' }
      // We return a NEW array with the old todos + one new todo at the end.
      return [
        ...state,
        { id: Date.now(), text: action.text, completed: false },
      ];
    case 'toggle':
      // action looks like: { type: 'toggle', id: 3 }
      // We loop through every todo. If its id matches action.id,
      // we flip its completed value. Otherwise, leave it unchanged.
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case 'remove':
      // action looks like: { type: 'remove', id: 3 }
      // We return a new array with that todo filtered out.
      return state.filter((todo) => todo.id !== action.id);
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
  // STEP 4: Whatever we return becomes the NEW state.
  // React sees the state changed, and re-renders the component.
}

// ─── Counter Example Component ──────────────────────────────────────
function CounterExample() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div className={styles.example}>
      <div className={styles.exampleLabel}>Live Example</div>
      <div className={styles.counterDisplay}>{state.count}</div>
      <div className={styles.buttonRow}>
        <button className={styles.btn} onClick={() => dispatch({ type: 'decrement' })}>
          − Decrement
        </button>
        <button className={styles.btnDanger} onClick={() => dispatch({ type: 'reset' })}>
          Reset
        </button>
        <button className={styles.btnPrimary} onClick={() => dispatch({ type: 'increment' })}>
          + Increment
        </button>
      </div>
    </div>
  );
}

// ─── Todo Example Component ─────────────────────────────────────────
function TodoExample() {
  // STEP 0: Hook up the reducer. todos starts as an empty array [].
  // "dispatch" is the function we call to send actions to todoReducer.
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [input, setInput] = useState('');

  function handleAdd(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    // STEP 1: We call dispatch with an action object.
    // This sends { type: 'add', text: 'Buy milk' } to todoReducer (step 2 above).
    // "type" tells the reducer WHAT to do. "text" is the extra data it needs.
    dispatch({ type: 'add', text });
    setInput('');
  }

  return (
    <div className={styles.example}>
      <div className={styles.exampleLabel}>Live Example</div>
      <form className={styles.todoInput} onSubmit={handleAdd}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo..."
        />
        <button type="submit" className={styles.btnPrimary}>
          Add
        </button>
      </form>
      {todos.length === 0 ? (
        <p className={styles.emptyState}>No todos yet. Add one above!</p>
      ) : (
        <ul className={styles.todoList}>
          {todos.map((todo) => (
            <li key={todo.id} className={styles.todoItem}>
              {/* STEP 1 (toggle): User clicks checkbox → we dispatch an action.
                  We include todo.id so the reducer knows WHICH todo to toggle.
                  This sends { type: 'toggle', id: 1738900000000 } to todoReducer. */}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => dispatch({ type: 'toggle', id: todo.id })}
              />
              <span className={todo.completed ? styles.todoTextCompleted : styles.todoText}>
                {todo.text}
              </span>
              {/* STEP 1 (remove): Same idea — dispatch with the id of the todo to delete. */}
              <button
                className={styles.todoRemove}
                onClick={() => dispatch({ type: 'remove', id: todo.id })}
                aria-label={`Remove "${todo.text}"`}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────
export default function LearnReducer() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Link href="/" className={styles.backLink}>
          ← Back to home
        </Link>

        <h1 className={styles.title}>useReducer</h1>
        <p className={styles.subtitle}>
          A React hook for managing complex state with actions and a reducer function.
        </p>

        {/* ── What is useReducer? ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What is useReducer?</h2>
          <p className={styles.text}>
            <code className={styles.inlineCode}>useReducer</code> is a React hook that lets you
            manage state by dispatching <strong>actions</strong> to a <strong>reducer function</strong>.
            It&apos;s an alternative to <code className={styles.inlineCode}>useState</code> that
            works better when:
          </p>
          <ul className={styles.tipsList}>
            <li>Your state has multiple sub-values (objects, arrays)</li>
            <li>The next state depends on the previous state</li>
            <li>You want state updates to be explicit and predictable</li>
          </ul>
        </section>

        {/* ── The Pattern ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>The Pattern</h2>
          <p className={styles.text}>
            Every useReducer setup has three parts:
          </p>
          <code className={styles.code}>{
`// 1. The reducer — a pure function that takes state + action, returns new state
function reducer(state, action) {
  switch (action.type) {
    case 'do_something':
      return { ...state, value: action.payload };
    default:
      throw new Error('Unknown action');
  }
}

// 2. Initialize in your component
const [state, dispatch] = useReducer(reducer, initialState);

// 3. Dispatch actions to update state
dispatch({ type: 'do_something', payload: 42 });`
          }</code>
          <p className={styles.text}>
            The <code className={styles.inlineCode}>dispatch</code> function sends an action object
            to the reducer. React calls your reducer with the current state and that action, then
            re-renders the component with the new state it returns.
          </p>
        </section>

        {/* ── Example 1: Counter ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Example 1: Counter</h2>
          <p className={styles.text}>
            A simple counter to see the basics. The reducer handles three action types:{' '}
            <code className={styles.inlineCode}>increment</code>,{' '}
            <code className={styles.inlineCode}>decrement</code>, and{' '}
            <code className={styles.inlineCode}>reset</code>.
          </p>
          <code className={styles.code}>{
`function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error(\`Unknown action: \${action.type}\`);
  }
}

const [state, dispatch] = useReducer(counterReducer, { count: 0 });`
          }</code>
          <CounterExample />
        </section>

        {/* ── Example 2: Todo List ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Example 2: Todo List</h2>
          <p className={styles.text}>
            This is where useReducer really shines. The state is an array of objects and
            we handle three actions: <code className={styles.inlineCode}>add</code>,{' '}
            <code className={styles.inlineCode}>toggle</code>, and{' '}
            <code className={styles.inlineCode}>remove</code>. Each action keeps the
            updates predictable and easy to follow.
          </p>
          <code className={styles.code}>{
`function todoReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, { id: Date.now(), text: action.text, completed: false }];
    case 'toggle':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case 'remove':
      return state.filter(todo => todo.id !== action.id);
    default:
      throw new Error(\`Unknown action: \${action.type}\`);
  }
}

const [todos, dispatch] = useReducer(todoReducer, []);`
          }</code>
          <TodoExample />
        </section>

        {/* ── Tips ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>When to Use useReducer vs useState</h2>
          <ul className={styles.tipsList}>
            <li>
              <strong>Use useState</strong> for simple, independent values — a boolean toggle,
              a single string, a number.
            </li>
            <li>
              <strong>Use useReducer</strong> when state updates are related or when
              the next state depends on the previous one (like adding to a list).
            </li>
            <li>
              Reducers must be <strong>pure functions</strong> — no side effects, no mutations.
              Always return a new object/array instead of modifying the existing one.
            </li>
            <li>
              Action types are just strings by convention. You could use constants or
              an enum to avoid typos in larger apps.
            </li>
            <li>
              You can combine useReducer with{' '}
              <code className={styles.inlineCode}>useContext</code> to share state and
              dispatch across deeply nested components — a lightweight alternative to Redux.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
