import React from 'react';
import Form from 'react-bootstrap/Form';
import '../pages/Main/Main.css';
function ProductSelector() {
	const brands = [
		'Apple',
		'Bosch',
		'Maybelline',
		'Nike',
		'Adidas',
		'Samsung',
		'Sony',
		'LG',
		'Microsoft',
		'Intel',
		'Huawei',
		'Xiaomi',
		'Coca-Cola',
		'Pepsi',
		'Ford',
		'BMW',
		'Canon',
		'Panasonic',
		'Under Armour',
		'Colgate',
	];
	return (
		<section className='product-selector-outer-con'>
			<Form>
				<Form.Text>Markalar</Form.Text>
				{brands.map((brand) => {
					return <Form.Check type='switch' id={brand} label={brand} />;
				})}
			</Form>
			<Form>
				<Form.Text>Fiyat Aralığı</Form.Text>
				<Form.Group controlId='ControlInput1' style={{ display: 'flex' }}>
					<Form.Control size='sm' type='number' placeholder='0' />
					-
					<Form.Control size='sm' type='number' placeholder='0' />
				</Form.Group>
			</Form>
			<Form>
				<Form.Text>Satıcı Türü</Form.Text>
				<Form.Check type='radio' label='Tümü' />
				<Form.Check type='radio' label='Doğrulanmış' />
			</Form>
		</section>
	);
}
export default ProductSelector;
