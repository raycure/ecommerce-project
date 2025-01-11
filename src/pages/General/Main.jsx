import React, { useEffect, useState } from 'react';
import CategoriesBar from '../../components/CategoriesBar';
import ProductList from '../../components/ProductList';
import AdCarousel from '../../components/AdCarousel';
import { useProducts } from '../../services/productStore';
import { selectUserType } from '../../redux/Slices/UserInfoSlice';
import { useSelector } from 'react-redux';
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
	const userType = useSelector(selectUserType);
	return (
		<>
			<section>
				{userType !== 'admin' && <AdCarousel />}
				{userType !== 'admin' && (
					<CategoriesBar
						selectedCategory={selectedCategory}
						setSelectedCategory={setSelectedCategory}
					/>
				)}
				<ProductList selectedCategory={selectedCategory} Data={Data} />
			</section>
		</>
	);
}
export default Main;
