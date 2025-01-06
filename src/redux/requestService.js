import { fetchData } from './requestSlice.js';

export const requestService =
	// data can be empty to include api calls like logouts


		({ endpoint, data = {}, method }) =>
		async (dispatch) => {
			try {
				console.log('req service reached');

				const response = await dispatch(
					fetchData({
						method: method,
						url: `${endpoint}`,
						data: data,
					})
				);
				console.log('response in service header', response.payload.headers);

				const isAccessTokenRefresh =
					response.payload.headers &&
					response.payload.headers['x-refreshed-token'];

				if (isAccessTokenRefresh) {
					console.log('refreshed');

					let newAccessToken = response.payload.data.accessToken;
					localStorage.setItem('accessToken', newAccessToken);
				}

				console.log('response in service', response);

				if (fetchData.rejected.match(response)) {
					throw response || 'An unknown error occurred';
				}
				return response;
			} catch (error) {
				console.log('error in service', error);
				return Promise.reject(error);
			}
		};
