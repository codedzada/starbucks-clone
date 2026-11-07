import { createSlice } from '@reduxjs/toolkit';

const isSameProduct = (a, b) => {
  if (!a || !b) return false;
  if (a.id && b.id) return String(a.id) === String(b.id);
  if (a.productNumber && b.productNumber) {
    const numMatch = String(a.productNumber) === String(b.productNumber);
    if (a.formCode && b.formCode) {
      return numMatch && String(a.formCode).toLowerCase() === String(b.formCode).toLowerCase();
    }
    return numMatch;
  }
  return false;
};


const initialState = {
  items: JSON.parse(localStorage.getItem('starbucks_favorites')) || [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const product = action.payload;
      if (!product) return;

      const existingIndex = state.items.findIndex(item => isSameProduct(item, product));

      if (existingIndex >= 0) {
        
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(product);
      }

      
      localStorage.setItem('starbucks_favorites', JSON.stringify(state.items));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;