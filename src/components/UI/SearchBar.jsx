import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router';
function SearchBar() {
	const [searchValue, setSearchValue] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const navigate = useNavigate();
	const handleSearchPropertyUpdate = (e) => {
		setSearchValue(e.target.value);
	};
	useEffect(() => {
		const fetchSearchSuggestions = () => {
			// https://dummyjson.com/users/search?q=Jo
			if (searchValue.trim() === '') {
				setSuggestions([]);
				return;
			}
			fetch(`https://dummyjson.com/users/search?q=${searchValue}`)
				.then((res) => res.json())
				.then((data) => setSuggestions(data))
				.catch((err) => {
					console.error(err);
				});
		};
		fetchSearchSuggestions();
		// console.log(suggestions.length);
	}, [searchValue]);
	const handleProductPick = () => {
		navigate('/item-info');
	};
	return (
		<Form className='d-flex'>
			<Dropdown show={suggestions?.users?.length > 0}>
				<Dropdown.Menu style={{ width: '320px' }}>
					{suggestions?.users?.map((user) => {
						return (
							<Dropdown.Item onClick={handleProductPick}>
								{user.firstName}
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
