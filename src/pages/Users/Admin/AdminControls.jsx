import React, { useEffect, useState } from 'react';
import Products from '../../../assets/Products';
import ProductItem from '../../../components/ProductItem';
import CustomPagination from '../../../components/UI/CustomPagination';
import AdminProductControls from '../../../components/AdminProductControls';
function AdminControls() {
	const [controlOptions, setControlOptions] = useState({
		selectedCategory: 'Elektronik', // her adminin sorumlu olduğu bir kategori var o
		sellerVerified: false,
	});
	const products = Products.filter((product) => {
		const isSellerValid =
			controlOptions.sellerVerified === false ||
			product.sellerVerified === controlOptions.sellerVerified;
		const isCategoryValid =
			product.category === controlOptions.selectedCategory;
		return isSellerValid && isCategoryValid;
	});
	const [paginationPageNumber, setPaginationPageNumber] = useState(1);
	const itemsPerPage = 16;
	const lastIndex = paginationPageNumber * itemsPerPage;
	const firstIndex = lastIndex - itemsPerPage;
	const paginatedEvents = products.slice(firstIndex, lastIndex);
	const pageAmount = Math.ceil(products.length / itemsPerPage);
	useEffect(() => {
		setPaginationPageNumber(1);
	}, [controlOptions.selectedCategory]);
	return (
		<section className='product-list-outer-con'>
			<AdminProductControls
				controlOptions={controlOptions}
				setControlOptions={setControlOptions}
			/>
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
		</section>
	);
}
export default AdminControls;
