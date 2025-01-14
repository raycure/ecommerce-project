import React, { useEffect, useState } from 'react';
import CategoriesBar from '../../components/CategoriesBar';
import ProductList from '../../components/ProductList';
import AdCarousel from '../../components/AdCarousel';
import { useProducts } from '../../services/productStore';

function Main() {
	const [selectedCategory, setSelectedCategory] = useState(null);
	const {
		data: Data,
		isLoading,
		isError,
		error,
		isFetching,
		dataUpdatedAt,
	} = useProducts();
	console.log('data', Data);

	return (
		<>
			<section>
				<AdCarousel />
				<CategoriesBar
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
				/>
				<ProductList selectedCategory={selectedCategory} Data={Data} />
			</section>
		</>
	);
}
export default Main;
