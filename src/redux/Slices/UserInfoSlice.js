import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userType: 'customer',
	userId: null,
	user: [],
};

const UserInfo = createSlice({
	name: 'userInfo',
	initialState,
	reducers: {
		setUserType(state, action) {
			state.userType = action.payload;
		},
		setUserId(state, action) {
			state.userId = action.payload;
		},
		setUser(state, action) {
			state.user = action.payload;
		},
		resetUserInfo(state) {
			state.userType = 'customer';
			state.userId = null;
		},
	},
});

export const { setUserType, setUserId, resetUserInfo, setUser } =
	UserInfo.actions;
export const selectUserType = (state) => state.userInfo.userType;
export const selectUser = (state) => state.userInfo.user;
export default UserInfo.reducer;
