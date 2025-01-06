import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import userInfoReducer from './Slices/UserInfoSlice.js';
import * as requestService from './requestService.js';
import requestSlice from './requestSlice.js';

const userInfoConfig = {
	key: 'userInfo',
	storage,
};
const requestPersistConfig = {
	key: 'requestSlice',
	storage,
	whitelist: ['isLoggedIn'],
};

const persistedUserInfoReducer = persistReducer(
	userInfoConfig,
	userInfoReducer
);
const persistedRequestReducer = persistReducer(
	requestPersistConfig,
	requestSlice
);

const store = configureStore({
	reducer: {
		userInfo: persistedUserInfoReducer,
		requestSlice: persistedRequestReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			thunk: { extraArgument: requestService },
			serializableCheck: {
				ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
			},
		}), //redux toolkit ve redux persist birlikte kullanıyoruz diye
});
export const persistor = persistStore(store);
export default store;
