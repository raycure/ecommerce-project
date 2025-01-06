import React, { useState } from 'react';
import CategoriesBar from '../../components/CategoriesBar';
import ProductList from '../../components/ProductList';
import AdCarousel from '../../components/AdCarousel';
// import { useUpdateProduct, useProducts } from '../../services/productStore';
import { useProducts } from '../../services/productStore';
import { selectUserType } from '../../redux/Slices/UserInfoSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function Main() {
	const [selectedCategory, setSelectedCategory] = useState(null);
	const navigate = useNavigate();

	let userType = useSelector(selectUserType);
	if (userType === 'seller') {
		console.log(
			'navigating the user out because main page is only for customers'
		);
		navigate('/shop');
	}

	return (
		<>
			<section>
				<AdCarousel />
				<CategoriesBar
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
				/>
				<ProductList selectedCategory={selectedCategory} />
			</section>
			{/* <section>
				<div>
					{isFetching && <div>Refreshing data...</div>}
					<div>Last updated: {timeAgo}</div>
				</div>
			</section> */}
		</>
	);
}
export default Main;
