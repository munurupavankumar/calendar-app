import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  companies: [],
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    addCompany(state, action) {
      const newCompany = {
        ...action.payload,
        id: state.companies.length > 0 ? Math.max(...state.companies.map(c => c.id)) + 1 : 1,
        communications: [],
      };
      state.companies.push(newCompany);
    },
    addCommunication(state, action) {
      const { companyId, communication } = action.payload;
      const company = state.companies.find((c) => c.id === companyId);
      if (company) {
        const newId = company.communications.length > 0
          ? Math.max(...company.communications.map(comm => comm.id)) + 1
          : 1;
        company.communications.push({ ...communication, id: newId });
      }
    },
    deleteCommunication(state, action) {
      const { companyId, communicationId } = action.payload;
      const company = state.companies.find((c) => c.id === companyId);
      if (company) {
        company.communications = company.communications.filter(comm => comm.id !== communicationId);
      }
    },
  },
  extraReducers: {},
});

export const { addCompany, addCommunication, deleteCommunication } = companySlice.actions;

export const selectOverdueCommunications = (state) => {
  const today = new Date().toISOString().split('T')[0];
  const overdue = [];

  state.company.companies.forEach((company) => {
    company.communications.forEach((comm) => {
      const commDate = new Date(comm.timestamp).toISOString().split('T')[0];
      if (commDate < today) {
        overdue.push({ ...comm, companyName: company.name });
      }
    });
  });

  return overdue;
};

export const selectTodaysCommunications = (state) => {
  const today = new Date().toISOString().split('T')[0];
  const todays = [];

  state.company.companies.forEach((company) => {
    company.communications.forEach((comm) => {
      const commDate = new Date(comm.timestamp).toISOString().split('T')[0];
      if (commDate === today) {
        todays.push({ ...comm, companyName: company.name });
      }
    });
  });

  return todays;
};

export default companySlice.reducer;
