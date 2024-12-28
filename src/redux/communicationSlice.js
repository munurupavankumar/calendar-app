import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  methods: [
    {
      id: 1,
      name: 'LinkedIn Post',
      description: 'Post updates on LinkedIn',
      sequence: 1,
      mandatory: true,
    },
    {
      id: 2,
      name: 'Email',
      description: 'Send an email to the contact',
      sequence: 2,
      mandatory: true,
    },
  ],
};

const communicationSlice = createSlice({
  name: 'communication',
  initialState,
  reducers: {
    addMethod(state, action) {
      const newId = state.methods.length > 0 ? Math.max(...state.methods.map((m) => m.id)) + 1 : 1;
      state.methods.push({ ...action.payload, id: newId });
    },
    editMethod(state, action) {
      const index = state.methods.findIndex((method) => method.id === action.payload.id);
      if (index !== -1) {
        state.methods[index] = action.payload;
      }
      state.methods.sort((a, b) => a.sequence - b.sequence);
    },
    deleteMethod(state, action) {
      state.methods = state.methods.filter((method) => method.id !== action.payload);
    },
    updateMethodOrder(state, action) {
      state.methods = action.payload.map((method, index) => ({
        ...method,
        sequence: index + 1,
      }));
    },
  },
});

export const { addMethod, editMethod, deleteMethod, updateMethodOrder } = communicationSlice.actions;

export default communicationSlice.reducer;
