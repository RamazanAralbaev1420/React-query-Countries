import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  singleCountry: [],
};

export const contriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    getCountry: (state, action) => {
      state.singleCountry = action.payload;
    },
  },
});

export const { getCountry } = contriesSlice.actions;

export default contriesSlice.reducer
