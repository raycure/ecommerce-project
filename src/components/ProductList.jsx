import React, { useEffect, useState } from 'react';
import ProductSelector from './ProductSelector';
import ProductItem from './ProductItem';
import { useProducts } from '../services/productStore';
import CustomPagination from './UI/CustomPagination';
import { data } from 'react-router';
function ProductList({ selectedCategory, sellerId, Data }) {
	const [productSelector, setProductSelector] = useState({
		brands: [],
		minPrice: 0,
		maxPrice: 0,
		showOnlyVerifiedSellers: false, //false olunca sadece verified olmayanlar değil hepsini göstermiş oluyor
	});

	const [paginationPageNumber, setPaginationPageNumber] = useState(1);
	useEffect(() => {
		setPaginationPageNumber(1);
	}, [
		selectedCategory,
		productSelector.showVerifiedSellers,
		productSelector.brands,
	]);
	console.log('Data', Data);

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
