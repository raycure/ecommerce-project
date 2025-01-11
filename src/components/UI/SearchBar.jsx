import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router';
import { useProducts } from '../../services/productStore';
function SearchBar() {
	const [searchValue, setSearchValue] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const navigate = useNavigate();
	const handleSearchPropertyUpdate = (e) => {
		setSearchValue(e.target.value);
	};
	const {
		data: Data,
		isLoading,
		isError,
		error,
		isFetching,
		dataUpdatedAt,
	} = useProducts();
	useEffect(() => {
		const fetchSearchSuggestions = () => {
			if (searchValue.trim() === '') {
				setSuggestions([]);
				return;
			} else {
				const filteredSuggestions = Data?.mappedResults.filter((product) => {
					return product.title
						.toLowerCase()
						.includes(searchValue.toLowerCase());
				});
				setSuggestions(
					filteredSuggestions.map((product) => ({
						title: product.title,
						sellerId: product.sellerId,
						productId: product.productId,
					}))
				);
			}
		};
		fetchSearchSuggestions();
	}, [searchValue]);
	console.log(suggestions);

	return (
		<Form className='d-flex'>
			<Dropdown show={suggestions?.length > 0}>
				<Dropdown.Menu style={{ width: '320px' }}>
					{suggestions?.map((product) => {
						const handleProductPick = () => {
							navigate(
								`/item-info/?productId=${product.productId}&sellerId=${product.sellerId}`
							);
						};
						return (
							<Dropdown.Item onClick={handleProductPick}>
								{product.title}
							</Dropdown.Item>
						);
					})}
				</Dropdown.Menu>
			</Dropdown>
			<Form.Control
				type='search'
				placeholder='Ürün ismi...'
				name='searchValue'
				className='me-2'
				value={searchValue}
				onChange={handleSearchPropertyUpdate}
				aria-label='Search'
				style={{ width: '20rem' }}
			/>
		</Form>
	);
}
export default SearchBar;
