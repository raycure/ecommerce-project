import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist';
const store = configureStore({
	reducer: {},
});
export const persistor = persistStore(store);
export default store;
