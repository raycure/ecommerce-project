import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../config/axios.js';

const initialState = {
	isLoggedIn: false,
	status: 'idle',
	isLoading: false,
	isSuccess: false,
	error: null,
};

async function setupAxiosDefaults() {
	const accesstoken = localStorage.getItem('accessToken');
	if (accesstoken) {
		axios.defaults.headers.common['Authorization'] = `Bearer ${accesstoken}`;
	} else {
		delete axios.defaults.headers.common['Authorization'];
	}
}

export const fetchData = createAsyncThunk(
	'requestSlice/fetchStatus',
	// data can be empty to include api calls like logout
	async ({ url, data = {}, method }, { rejectWithValue }) => {
		await setupAxiosDefaults();
		try {
			const response = await axios({
				url,
				data,
				method: method,
			});
			console.log('response in slice', response);

			return {
				data: response.data,
				status: response.status,
				headers: response?.headers,
				endpoint: url,
			};
		} catch (error) {
			console.log('error in slice', error);
			const responseData = {
				data: error.response?.data,
				status: error.response?.status,
				headers: error.response?.headers,
			};
			console.log('error in slice', error);
			return rejectWithValue(responseData);
		}
	}
);

const requestSlice = createSlice({
	name: 'requestSlice',
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchData.pending, (state) => {
				state.status = 'loading';
				state.isLoading = true;
			})
			.addCase(fetchData.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.isLoading = false;
				state.isSuccess = true;
				if (
					action.payload.endpoint.includes('/login') ||
					action.payload.endpoint.includes('/register')
				) {
					state.isLoggedIn = true;
				}
				if (action.payload.endpoint.includes('/logout')) {
					state.isLoggedIn = false;
				}
			})
			.addCase(fetchData.rejected, (state, action) => {
				state.status = 'failed';
				state.isLoading = false;
				state.isSuccess = false;
				state.error = action.payload || 'An unknown error occurred';
			});
	},
});

export const selectIsLoading = (state) => state.requestSlice.isLoading;
export const selectIsLoggedIn = (state) => state.requestSlice.isLoggedIn;
export const selectError = (state) => state.requestSlice.error;
export default requestSlice.reducer;
