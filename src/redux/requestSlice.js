import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setUserType } from './Slices/UserInfoSlice.js';
import axios from '../config/axios.js';
const initialState = {
	isLoggedIn: false,
	status: 'idle',
	isLoading: false,
	isSuccess: false,
	error: null,
};

const serializeHeaders = (headers) => {
	if (!headers) return null;
	const serializedHeaders = {};
	// Convert headers object to plain key-value pairs
	Object.entries(headers).forEach(([key, value]) => {
		if (typeof value === 'string') {
			serializedHeaders[key] = value;
		}
	});
	return serializedHeaders;
};

async function setupAxiosDefaults() {
	const accesstoken = localStorage.getItem('accessToken');
	console.log('typeof accesstoken:', typeof accesstoken);
	console.log('Is null?:', accesstoken === null);
	console.log('Is undefined?:', accesstoken === undefined);
	if (accesstoken !== 'undefined') {
		// console.log('the token thats in the header', accesstoken);
		console.log('access token SETTING HEADER');
		axios.defaults.headers.common['Authorization'] = `Bearer ${accesstoken}`;
	} else {
		console.log('accestoken silinmis');
		// delete axios.defaults.headers.common['Authorization'];
	}
}

export const fetchData = createAsyncThunk(
	'requestSlice/fetchStatus',
	// data can be empty to include api calls like logout
	async ({ url, data = {}, method }, { rejectWithValue, dispatch }) => {
		await setupAxiosDefaults();
		try {
			const response = await axios({
				url,
				data,
				method,
			});
			console.log('response in slice', response);

			if (url.includes('/login') || url.includes('/register')) {
				dispatch(setUserType(response.data.userType));
			}

			return {
				data: response.data,
				status: response.status,
				endpoint: url,
				headers: serializeHeaders(response.headers),
			};
		} catch (error) {
			console.log('error in slice', error);
			const responseData = {
				data: error.response?.data,
				status: error.response?.status,
				headers: serializeHeaders(error.response.headers),
			};
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
					console.log(
						'action.payload.endpoint in slice',
						action.payload.data.userType
					);
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
