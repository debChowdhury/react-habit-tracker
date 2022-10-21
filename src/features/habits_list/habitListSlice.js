import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

// getting initial state from local storage is not empty and setting it in the slice
let mInitialState = null;
if(window.localStorage.getItem("habits") == null){
  mInitialState = [];
}
else{
  mInitialState = JSON.parse(window.localStorage.getItem("habits"));
}
const initialState = {
    value: mInitialState
};

// creating the habit list slice
export const habitListSlice = createSlice({
  name: 'habitList',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // creating the addHabit reducer
    addHabit: (state, action) => {
      state.value.push(action.payload);
      window.localStorage.setItem("habits", JSON.stringify(state.value));
    },
    //creating the edit habit reducer
    editHabitStatusAccordingToDate: (state, action) => {
      // updating the habit status of a specific date of a specific habit
      let valuesObj = state.value.slice();
      let values = JSON.stringify(valuesObj);
      const specificHabit = JSON.parse(values).filter(i => i.id == action.payload.habitId)[0];
      let mStatusDaysGiven = specificHabit.statusDaysGiven;
      let modified = false;
      mStatusDaysGiven.map((day) => {
        if(day.date == action.payload.dateValue){
          day.status = action.payload.status;
          modified = true;
        }
      });
      if(!modified){
        mStatusDaysGiven.push({date:action.payload.dateValue, status:action.payload.status});
      }
      for(let i=0;i<valuesObj.length;i++){
        if(valuesObj[i].id == action.payload.habitId){
          valuesObj[i].statusDaysGiven = mStatusDaysGiven;
          break;
        }
      }
      window.localStorage.setItem("habits", JSON.stringify(valuesObj));
    }
  },
});

// exporting all the actions
export const { addHabit, editHabitStatusAccordingToDate } = habitListSlice.actions;

//function to return the habit list current redux state
export const selectHabitList = (state) => {
  return state.habitList.value;
}

//function to return a specific habit from the current redux state
export const useHabitListDetails = (id) => {
  return useSelector((state) => state.habitList.value.filter(item => item.id == id)[0]);
}

export default habitListSlice.reducer;