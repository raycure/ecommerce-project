import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import userInfoReducer from './Slices/UserInfoSlice.js';

const userInfoConfig = {
	key: 'userInfo',
	storage,
};

const persistedUserInfoReducer = persistReducer(
	userInfoConfig,
	userInfoReducer
);

const store = configureStore({
	reducer: {
		userInfo: persistedUserInfoReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
			},
		}), //redux toolkit ve redux persist birlikte kullanıyoruz diye
});
export const persistor = persistStore(store);
export default store;
