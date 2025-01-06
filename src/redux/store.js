import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import userInfoReducer from './Slices/UserInfoSlice.js';
import orderInfoReducer from './Slices/OrderInfoSlice.js';

const userInfoConfig = { key: 'userInfo', storage };
const persistedUserInfoReducer = persistReducer(
	userInfoConfig,
	userInfoReducer
);
const orderInfoConfig = { key: 'orderInfo', storage };
const persistedOrderInfoReducer = persistReducer(
	orderInfoConfig,
	orderInfoReducer
);

const store = configureStore({
	reducer: {
		userInfo: persistedUserInfoReducer,
		orderInfo: persistedOrderInfoReducer,
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
