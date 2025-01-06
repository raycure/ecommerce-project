import React, { useEffect, useState } from 'react';
import ProductSelector from './ProductSelector';
import ProductItem from './ProductItem';
import Products from '../assets/Products';
import CustomPagination from './UI/CustomPagination';
function ProductList({ selectedCategory, sellerId }) {
	const [productSelector, setProductSelector] = useState({
		brands: [],
		minPrice: 0,
		maxPrice: 0,
		sellerVerified: false, //false olunca sadece verified olmayanlar değil hepsini göstermiş oluyor
	});
	const products = Products.filter((product) => {
		const isPriceValid =
			(productSelector.minPrice <= 0 ||
				product.price >= productSelector.minPrice) &&
			(productSelector.maxPrice <= 0 ||
				product.price <= productSelector.maxPrice);
		const isSellerValid =
			productSelector.sellerVerified === false ||
			product.sellerVerified === productSelector.sellerVerified;
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
	const [paginationPageNumber, setPaginationPageNumber] = useState(1);
	const itemsPerPage = 16;
	const lastIndex = paginationPageNumber * itemsPerPage;
	const firstIndex = lastIndex - itemsPerPage;
	const paginatedEvents = products.slice(firstIndex, lastIndex);
	const pageAmount = Math.ceil(products.length / itemsPerPage);
	useEffect(() => {
		setPaginationPageNumber(1);
	}, [
		selectedCategory,
		productSelector.sellerVerified,
		productSelector.brands,
	]);
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
		</section>
	);
}
export default ProductList;
