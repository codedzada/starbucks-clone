import { createSlice } from '@reduxjs/toolkit';

const getInitialStore = () => {
  try {
    const saved = localStorage.getItem('selectedStore');
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

const initialState = {
  selectedStore: getInitialStore(),
};

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setSelectedStore: (state, action) => {
      state.selectedStore = action.payload || null;
      try {
        if (action.payload) {
          localStorage.setItem('selectedStore', JSON.stringify(action.payload));
        } else {
          localStorage.removeItem('selectedStore');
        }
      } catch {/* ignore */}
    },
    clearSelectedStore: (state) => {
      state.selectedStore = null;
      try {
        localStorage.removeItem('selectedStore');
      } catch {/* ignore */}
    },
  },
});

export const { setSelectedStore, clearSelectedStore } = storeSlice.actions;
export default storeSlice.reducer;
