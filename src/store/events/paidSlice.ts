import { createSlice } from '@reduxjs/toolkit';

interface IsPaidState {
  isPaidEvent: boolean;
}

const initialState: IsPaidState = {
  isPaidEvent: false
};

const isPaidSlice = createSlice({
  name: 'isPaid',
  initialState,
  reducers: {
    setPaidState(state, action) {
      state.isPaidEvent = action.payload;
    }
  },
});

export const { setPaidState } = isPaidSlice.actions;

export default isPaidSlice.reducer;
