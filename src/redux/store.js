import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import userInfoReducer from './Slices/UserInfoSlice.js';
import orderInfoReducer from './Slices/OrderInfoSlice.js';
import * as requestService from './requestService.js';
import requestSlice from './requestSlice.js';
const userInfoConfig = { key: 'userInfo', storage };
const persistedUserInfoReducer = persistReducer(
	userInfoConfig,
	userInfoReducer
);

const requestPersistConfig = {
	key: 'requestSlice',
	storage,
	whitelist: ['isLoggedIn'],
};
const orderInfoConfig = { key: 'orderInfo', storage };
const persistedOrderInfoReducer = persistReducer(
	orderInfoConfig,
	orderInfoReducer
);
const persistedRequestReducer = persistReducer(
	requestPersistConfig,
	requestSlice
);

const store = configureStore({
	reducer: {
		userInfo: persistedUserInfoReducer,
		requestSlice: persistedRequestReducer,
		orderInfo: persistedOrderInfoReducer,
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
