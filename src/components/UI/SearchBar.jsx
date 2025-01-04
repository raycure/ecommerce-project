import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaMagnifyingGlass } from 'react-icons/fa6';
function SearchBar() {
	return (
		<Form className='d-flex'>
			<Form.Control
				type='search'
				placeholder='Ara'
				className='me-2'
				aria-label='Search'
				style={{ borderRadius: '2rem', width: '20rem' }}
			/>
			<Button
				variant='outline-dark'
				style={{
					borderRadius: '1.5rem',
					marginRight: '1rem',
				}}
			>
				<FaMagnifyingGlass color='black' />
			</Button>
		</Form>
	);
}
export default SearchBar;
