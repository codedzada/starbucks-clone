import { createSlice } from '@reduxjs/toolkit';

const getInitialPreviousOrders = () => {
  try {
    const saved = localStorage.getItem('starbucks_previous_orders');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState = {
  items: getInitialPreviousOrders(),
};

export const previousOrdersSlice = createSlice({
  name: 'previousOrders',
  initialState,
  reducers: {
    setPreviousOrders: (state, action) => {
      state.items = action.payload || [];
      try {
        localStorage.setItem('starbucks_previous_orders', JSON.stringify(state.items));
      } catch {/* ignore */}
    },
    addOrder: (state, action) => {
      if (action.payload) {
        state.items.unshift(action.payload);
        try {
          localStorage.setItem('starbucks_previous_orders', JSON.stringify(state.items));
        } catch {/* ignore */}
      }
    },
    clearPreviousOrders: (state) => {
      state.items = [];
      try {
        localStorage.removeItem('starbucks_previous_orders');
      } catch {/* ignore */}
    },
  },
});

export const { setPreviousOrders, addOrder, clearPreviousOrders } = previousOrdersSlice.actions;
export default previousOrdersSlice.reducer;