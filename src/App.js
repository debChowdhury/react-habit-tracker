import React from 'react';
import { HabitsList } from './features/habits_list/HabitsList';

// constants for habit status
export const DONE = 0;
export const NOT_DONE = 1;
export const NONE = 2;

// function to get today's date
export function getTodayDate(){
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();

  today = dd + '/' + mm + '/' + yyyy;
  return today;
}

// function to get 7 dates according to prev and next multiple value. default is 7 dates prior and including the current date
export function getDates(multiple) {
  var aryDates = [];

  for (var i = ((7*multiple)+6); i >= (7*multiple); i--) {
      var currentDate = new Date();
      currentDate.setDate(currentDate.getDate() - i);
      aryDates.push(String(currentDate.getDate()).padStart(2, '0') + "/" + String((currentDate.getMonth()+1)).padStart(2, '0') + "/" + currentDate.getFullYear());
  }

  return aryDates;
}

function App() {
  return (
    // the app component
    <div className="App">
      <header className="App-header">
        <HabitsList />
      </header>
    </div>
  );
}

export default App;
