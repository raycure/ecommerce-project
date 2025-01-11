import { fetchData } from './requestSlice.js';

export const requestService =
	// data can be empty to include api calls like logouts


		({ endpoint, data = {}, method }) =>
		async (dispatch) => {
			try {
				const queryString =
					method === 'GET' ? `?${new URLSearchParams(data)}` : '';
				const response = await dispatch(
					fetchData({
						method: method,
						url: `${endpoint}${queryString}`,
						data: method === 'GET' ? undefined : data,
					})
				);

				const isAccessTokenRefresh =
					response?.payload?.headers?.['x-refreshed-token'] || false;

				if (isAccessTokenRefresh) {
					console.log('refreshed');
					let newAccessToken = response.payload.data.accessToken;
					localStorage.setItem('accessToken', newAccessToken);
				}

				// console.log('response in service', response);

				if (fetchData.rejected.match(response)) {
					throw response || 'An unknown error occurred';
				}
				return response;
			} catch (error) {
				console.log('error in service', error);
				return Promise.reject(error);
			}
		};
