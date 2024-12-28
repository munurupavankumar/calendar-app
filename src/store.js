import { configureStore } from '@reduxjs/toolkit';
import companyReducer from './redux/companySlice';
import communicationReducer from './redux/communicationSlice'; // Import the new reducer

const store = configureStore({
  reducer: {
    company: companyReducer,         // For managing company-related state
    communication: communicationReducer, // For managing communication methods
  },
});

export default store;
