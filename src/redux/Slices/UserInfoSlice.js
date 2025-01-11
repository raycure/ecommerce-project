import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userType: 'customer',
	userId: null,
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
		resetUserInfo(state) {
			state.userType = 'customer';
			state.userId = null;
		},
	},
});

export const { setUserType, setUserId, resetUserInfo } = UserInfo.actions;
export const selectUserType = (state) => state.userInfo.userType;
export default UserInfo.reducer;
