import React, { useState } from 'react';
import './Main.css';
import CategoriesBar from '../../components/CategoriesBar';
import ProductList from '../../components/ProductList';
function Main() {
	const [selectedCategory, setSelectedCategory] = useState(null);
	return (
		<section>
			<CategoriesBar
				selectedCategory={selectedCategory}
				setSelectedCategory={setSelectedCategory}
			/>
			<ProductList selectedCategory={selectedCategory} />
		</section>
	);
}
export default Main;
