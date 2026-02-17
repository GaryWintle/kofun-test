'use client';

import ActiveThingTest from '@/components/ActiveThingTest/ActiveThingTest';
import SimpleCounter from '@/components/SimpleCounter';
import TimerTest from '@/components/TimerTest';
import ReducerTimerTest from '@/components/ReducerTimerTest';
import ToDoList from '@/components/ToDoList';
import HaniwaTest from '@/components/HaniwaTest';
import WeatherTest from '@/components/WeatherTest';
import CharacterText from '@/components/CharacterText';

function ReactWorkout() {
  return (
    <div>
      {/* <SimpleCounter /> */}
      {/* <ActiveThingTest /> */}
      {/* <TimerTest /> */}
      {/* <ReducerTimerTest /> */}
      <WeatherTest />
      {/* <HaniwaTest /> */}
      <CharacterText />
      <ToDoList />
    </div>
  );
}

export default ReactWorkout;
