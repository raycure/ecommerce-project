import React, { useState } from 'react';
import CategoriesBar from '../../components/CategoriesBar';
import ProductList from '../../components/ProductList';
import AdCarousel from '../../components/AdCarousel';
function Main() {
	const [selectedCategory, setSelectedCategory] = useState(null);
	return (
		<section>
			<AdCarousel />
			<CategoriesBar
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
			/>
			<ProductList selectedCategory={selectedCategory} />
		</section>
	);
}
export default Main;
