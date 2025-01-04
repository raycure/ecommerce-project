import { fetchData } from './requestSlice.js';

export const requestService =
	// data can be empty to include api calls like logouts


		({ endpoint, data = {}, method }) =>
		async (dispatch) => {
			try {
				const response = await dispatch(
					fetchData({
						method: method,
						url: `${endpoint}`,
						data: data,
					})
				);

				console.log('response in service', response);
				const isAccessTokenRefresh =
					response.payload?.headers &&
					response.payload?.headers['x-refreshed-token'];

				if (isAccessTokenRefresh) {
					let newAccessToken = response.payload.data.accessToken;
					localStorage.setItem('accessToken', newAccessToken);
				}
				if (fetchData.rejected.match(response)) {
					throw response || 'An unknown error occurred';
				}
				if (response.payload.data.notify) {
					successHandler(response);
				}
				return response;
			} catch (error) {
				console.log('error in service', error);
				const isIpBlocked =
					error.payload?.headers && error.payload?.headers['ip-blocked'];
				if (isIpBlocked) {
					const ipBlockedEvent = new Event('ipBlockedEvent');
					window.dispatchEvent(ipBlockedEvent);
				}
				if (error.payload.data) {
					return errorHandler(error);
				}
				return Promise.reject(error);
			}
		};
