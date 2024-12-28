import React from 'react';
import Form from 'react-bootstrap/Form';
import '../pages/Main/Main.css';
import brands from '../assets/Brands';
function ProductSelector({ setProductSelector, sellerId }) {
	const handleProductSelector = (e) => {
		if (e.target.type === 'number') {
			setProductSelector((prev) => ({
				...prev,
				[e.target.name]: e.target.value ? parseFloat(e.target.value) : 0,
			}));
		} else if (e.target.type === 'radio') {
			setProductSelector((prev) => ({
				...prev,
				[e.target.name]: e.target.value === 'true',
			}));
		}
	};
	const handleProductSelectorBrands = (text, action) => {
		setProductSelector((prev) => {
			let updatedBrands = [...prev.brands];

			if (action === 'add' && !updatedBrands.includes(text)) {
				updatedBrands.push(text);
			} else if (action === 'remove') {
				updatedBrands = updatedBrands.filter((brand) => brand !== text);
			}
			return {
				...prev,
				brands: updatedBrands,
			};
		});
	};
	return (
		<section className='product-selector-outer-con'>
			<Form>
				<Form.Text>Markalar</Form.Text>
				{brands.map((brand) => (
					<Form.Check
						onChange={(e) => {
							e.target.checked
								? handleProductSelectorBrands(brand, 'add')
								: handleProductSelectorBrands(brand, 'remove');
						}}
						name='brands'
						type='switch'
						id={brand}
						label={brand}
					/>
				))}
			</Form>
			<Form>
				<Form.Text>Fiyat Aralığı</Form.Text>
				<Form.Group controlId='ControlInput1' style={{ display: 'flex' }}>
					<Form.Control
						name='minPrice'
						size='sm'
						type='number'
						placeholder='0'
						onChange={handleProductSelector}
					/>
					-
					<Form.Control
						name='maxPrice'
						size='sm'
						type='number'
						placeholder='0'
						onChange={handleProductSelector}
					/>
				</Form.Group>
			</Form>
			{!sellerId && (
				<Form>
					<Form.Text>Satıcı Türü</Form.Text>
					<Form.Check
						value={false}
						name='sellerVerified'
						defaultChecked
						type='radio'
						label='Tümü'
						onChange={handleProductSelector}
					/>
					<Form.Check
						value={true}
						onChange={handleProductSelector}
						name='sellerVerified'
						type='radio'
						label='Doğrulanmış'
					/>
				</Form>
			)}
		</section>
	);
}
export default ProductSelector;
