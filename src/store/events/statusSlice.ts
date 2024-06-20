import { createSlice } from '@reduxjs/toolkit';

interface IsStatusSlice {
  isStatusEvent: string;
}

const initialState: IsStatusSlice = {
  isStatusEvent: "OFFLINE"
};

const isStatusSlice = createSlice({
  name: 'isStatus',
  initialState,
  reducers: {
    setStatusState(state, action) {
      state.isStatusEvent = action.payload;
    }
  },
});

export const { setStatusState } = isStatusSlice.actions;

export default isStatusSlice.reducer;
