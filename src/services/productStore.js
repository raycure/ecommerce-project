import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { requestService } from '../redux/requestService';
import { useDispatch } from 'react-redux';

// Custom hook for products with staleness handling
export function useProducts(identification) {
	const dispatch = useDispatch();
	const fetchProducts = async () => {
		try {
			const response = await dispatch(
				requestService({
					endpoint: '/crud/getProductsBasedOnUser',
					method: 'GET',
					data: identification,
				})
			);
			if (response?.payload?.data) {
				return response.payload.data;
			}
			if (response.response?.payload.status !== 200) {
				throw new Error('Network response was not ok');
			}
		} catch (error) {}
	};
	return useQuery({
		queryKey: ['useProducts'],
		queryFn: fetchProducts,
		staleTime: 5 * 1000, // 5 sec
		cacheTime: 10 * 60 * 1000, // 10 min
		refetchOnWindowFocus: true, // Refetch when user returns to tab like minimazing and opening the page or just by switching tabs and returning
		refetchOnMount: 'always',
		// refetchIntervalInBackground: false,
		// refetchInterval: 10 * 1000, // every 10 sec it refetched the data
	});
}

export function useUserInfo(url, identification) {
	const dispatch = useDispatch();
	const fetchUserInfo = async () => {
		try {
			const response = await dispatch(
				requestService({
					endpoint: url,
					method: 'GET',
					data: identification,
				})
			);
			if (response?.payload?.data) {
				return response.payload.data;
			}
			if (response.response?.payload.status !== 200) {
				throw new Error('Network response was not ok');
			}
		} catch (error) {}
	};
	return useQuery({
		queryKey: ['useUserInfo'],
		queryFn: fetchUserInfo,
		staleTime: 30 * 1000, // 5 sec
		// cacheTime: 10 * 60 * 1000, // 10 min
		// refetchIntervalInBackground: false,
		// refetchInterval: 10 * 1000, // every 10 sec it refetched the data
		refetchOnWindowFocus: true, // Refetch when user returns to tab like minimazing and opening the page or just by switching tabs and returning
		refetchOnMount: 'always',
	});
}
export function fetchSellerProducts() {
	const dispatch = useDispatch();
	const fetchSellerProducts = async () => {
		console.log('fetchSellerProducts is reached');

		try {
			const response = await dispatch(
				requestService({
					endpoint: '/crud/sellersProducts',
					method: 'GET',
				})
			);
			console.log('response of fetchSellerProducts', response);

			if (response?.payload?.data) {
				return response.payload.data;
			}
			if (response.response?.payload.status !== 200) {
				throw new Error('Network response was not ok');
			}
		} catch (error) {}
	};
	return useQuery({
		queryKey: ['fetchSellerProducts'],
		queryFn: fetchSellerProducts,
		// staleTime: 5 * 1000, // 5 sec
		cacheTime: 10 * 60 * 1000, // 10 min
		// refetchIntervalInBackground: false,
		// refetchInterval: 10 * 1000, // every 10 sec it refetched the data
		refetchOnWindowFocus: true, // Refetch when user returns to tab like minimazing and opening the page or just by switching tabs and returning
	});
}
