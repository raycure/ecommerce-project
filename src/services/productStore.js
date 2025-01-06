import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { requestService } from '../redux/requestService';
import { useDispatch } from 'react-redux';

// Custom hook for products with staleness handling
export function useProducts() {
	const dispatch = useDispatch();
	const fetchProducts = async () => {
		try {
			const response = await dispatch(
				requestService({
					endpoint: '/test',
					method: 'GET',
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
		queryKey: ['products'],
		queryFn: fetchProducts,
		// staleTime: 5 * 1000, // 5 sec
		cacheTime: 10 * 60 * 1000, // 10 min
		// refetchIntervalInBackground: false,
		// refetchInterval: 10 * 1000, // every 10 sec it refetched the data
		// refetchOnWindowFocus: true, // Refetch when user returns to tab like minimazing and opening the page or just by switching tabs and returning
	});
}

export function useUserInfo() {
	const dispatch = useDispatch();
	const fetchUserInfo = async () => {
		try {
			const response = await dispatch(
				requestService({
					endpoint: '/testUserInfo',
					method: 'GET',
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
		queryKey: ['products'],
		queryFn: fetchUserInfo,
		// staleTime: 5 * 1000, // 5 sec
		// cacheTime: 10 * 60 * 1000, // 10 min
		// refetchIntervalInBackground: false,
		// refetchInterval: 10 * 1000, // every 10 sec it refetched the data
		// refetchOnWindowFocus: true, // Refetch when user returns to tab like minimazing and opening the page or just by switching tabs and returning
	});
}
export function fetchSellerProducts() {
	const dispatch = useDispatch();
	const fetchSellerProducts = async () => {
		console.log('fetchSellerProducts is reached');

		try {
			const response = await dispatch(
				requestService({
					endpoint: '/sellersProducts',
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
		queryKey: ['sellerProducts'],
		queryFn: fetchSellerProducts,
		// staleTime: 5 * 1000, // 5 sec
		cacheTime: 10 * 60 * 1000, // 10 min
		// refetchIntervalInBackground: false,
		// refetchInterval: 10 * 1000, // every 10 sec it refetched the data
		// refetchOnWindowFocus: true, // Refetch when user returns to tab like minimazing and opening the page or just by switching tabs and returning
	});
}

// Hook for updating products
// export function useUpdateProduct() {
// 	const queryClient = useQueryClient();

// 	return useMutation({
// 		mutationFn: updateProduct,
// 		onMutate: async (newProduct) => {
// 			await queryClient.cancelQueries(['products']);
// 			const previousProducts = queryClient.getQueryData(['products']);
// 			queryClient.setQueryData(['products'], (old) => {
// 				return old.map((product) =>
// 					product.id === newProduct.id ? newProduct : product
// 				);
// 			});

// 			return { previousProducts };
// 		},
// 		onError: (err, newProduct, context) => {
// 			queryClient.setQueryData(['products'], context.previousProducts);
// 		},
// 		onSettled: () => {
// 			queryClient.invalidateQueries(['products']);
// 		},
// 	});
// }

export async function useProductsByUserType(userType) {
	if (userType === 'customer') {
		console.log('for customer');
		const response = await useProducts();
		return response.data;
	} else {
		console.log('for seller');
		const response = fetchSellerProducts();
		return response.data.mappedResults;
	}
}
