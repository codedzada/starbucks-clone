import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import previousOrdersReducer from './previousOrdersSlice';
import storeReducer from './storeSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    previousOrders: previousOrdersReducer,
    store: storeReducer,
  },
});