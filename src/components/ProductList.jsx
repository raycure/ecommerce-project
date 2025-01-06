import React, { useEffect, useState } from 'react';
import ProductSelector from './ProductSelector';
import ProductItem from './ProductItem';
import {
	useProducts,
	fetchSellerProducts,
	useProductsByUserType,
} from '../services/productStore';
import CustomPagination from './UI/CustomPagination';
import { useSelector } from 'react-redux';
import { selectUserType } from '../redux/Slices/UserInfoSlice';
function ProductList({ selectedCategory, sellerId }) {
	const [productSelector, setProductSelector] = useState({
		brands: [],
		minPrice: 0,
		maxPrice: 0,
		showOnlyVerifiedSellers: false, //false olunca sadece verified olmayanlar değil hepsini göstermiş oluyor
	});

	const {
		data: Data,
		isLoading,
		isError,
		error,
		isFetching,
		dataUpdatedAt,
	} = useProducts();
	console.log('data in shops seller', Data);

	const [paginationPageNumber, setPaginationPageNumber] = useState(1);
	useEffect(() => {
		setPaginationPageNumber(1);
	}, [
		selectedCategory,
		productSelector.showVerifiedSellers,
		productSelector.brands,
	]);

	if (!Data) return <div>No products found</div>;

	const products = Data?.mappedResults.filter((product) => {
		const isPriceValid =
			(productSelector.minPrice <= 0 ||
				product.price >= productSelector.minPrice) &&
			(productSelector.maxPrice <= 0 ||
				product.price <= productSelector.maxPrice);
		const isSellerValid =
			productSelector.showOnlyVerifiedSellers === false ||
			product.showOnlyVerifiedSellers ===
				productSelector.showOnlyVerifiedSellers;
		const isBrandValid =
			productSelector.brands.length === 0 ||
			productSelector.brands.includes(product.brand);
		const isCategoryValid =
			selectedCategory === null ||
			selectedCategory === undefined ||
			product.category === selectedCategory;
		const isSellerSelected =
			sellerId === null ||
			sellerId === undefined ||
			sellerId === product.seller;
		return (
			isPriceValid &&
			isSellerValid &&
			isBrandValid &&
			isCategoryValid &&
			isSellerSelected
		);
	});

	const itemsPerPage = 16;
	const lastIndex = paginationPageNumber * itemsPerPage;
	const firstIndex = lastIndex - itemsPerPage;
	const paginatedEvents = products.slice(firstIndex, lastIndex);
	const pageAmount = Math.ceil(products.length / itemsPerPage);
	return (
		<section className='product-list-outer-con'>
			<ProductSelector
				sellerId={sellerId}
				setProductSelector={setProductSelector}
			/>
			{products.length === 0 ? (
				<p>Üzgünüz aradığınız kriterlerde bir ürün bulunmamaktadır.</p>
			) : (
				<section className='product-list-inner-con'>
					<div className='product-list-grid'>
						{paginatedEvents.map((product, index) => {
							return <ProductItem key={index} product={product} />;
						})}
					</div>
					<CustomPagination
						paginationPageNumber={paginationPageNumber}
						setPaginationPageNumber={setPaginationPageNumber}
						pageAmount={pageAmount}
					/>
				</section>
			)}

			{/* <div>
				{isFetching && <div>Refreshing data...</div>}
				<div>Last updated: {timeAgo}</div>
			</div> */}
		</section>
	);
}
export default ProductList;
