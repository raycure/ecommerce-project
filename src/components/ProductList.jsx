import React, { useEffect, useState } from 'react';
import ProductSelector from './ProductSelector';
import ProductItem from './ProductItem';
import Products from '../assets/Products';
import CustomPagination from './UI/CustomPagination';
import '../pages/Main/Main.css';
function ProductList({ selectedCategory }) {
	const products = Products.filter((product) => {
		if (selectedCategory === null || selectedCategory === undefined) {
			return true;
		}
		return selectedCategory === product.category;
	});
	const [paginationPageNumber, setPaginationPageNumber] = useState(1);
	const itemsPerPage = 16;
	const lastIndex = paginationPageNumber * itemsPerPage;
	const firstIndex = lastIndex - itemsPerPage;
	const paginatedEvents = products.slice(firstIndex, lastIndex);
	const pageAmount = Math.ceil(products.length / itemsPerPage);
	useEffect(() => {
		setPaginationPageNumber(1);
	}, [selectedCategory]);
	return (
		<section className='product-list-outer-con'>
			<ProductSelector />
			<section className='product-list-inner-con'>
				<div className='product-list-grid'>
					{paginatedEvents.map((product) => {
						return (
							<ProductItem
								title={product.title}
								category={product.category}
								price={product.price}
								seller={product.seller}
								stock={product.stock}
								brand={product.brand}
							/>
						);
					})}
				</div>
				<CustomPagination
					paginationPageNumber={paginationPageNumber}
					setPaginationPageNumber={setPaginationPageNumber}
					pageAmount={pageAmount}
				/>
			</section>
		</section>
	);
}
export default ProductList;
