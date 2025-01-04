import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	userType: null, // admin, shopper ve seller optionları var
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
			state.userType = 'shopper';
			state.userId = null;
		},
	},
});

export const { setUserType, setUserId, resetUserInfo } = UserInfo.actions;
export default UserInfo.reducer;
