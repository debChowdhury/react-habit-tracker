import { configureStore } from '@reduxjs/toolkit';
import habitListReducer from '../features/habits_list/habitListSlice';

//creating redux store
export const store = configureStore({
  reducer: {
    // creating a habit list reducer
    habitList: habitListReducer
  },
});
