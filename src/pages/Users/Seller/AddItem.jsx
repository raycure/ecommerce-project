import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import brands from '../../../assets/Brands';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
function AddItem() {
	const [productData, setProductData] = useState({
		name: '',
		description: '',
		//image: '',
		category: '',
		brand: '',
	}); //functionda +1 eklemek gerekebilir
	const categories = [
		'Elektronik',
		'Moda',
		'Yiyecek ve İçecek',
		'Kitap',
		'Beyaz Eşya',
		'Ofis Malzemeleri',
		'Spor Ekipmanları',
		'Kırtasiye',
		'Bebek Ürünleri',
		'Ev Dekorasyonu',
		'Aksesuarlar',
		'Müzik Aletleri',
		'Farmaşötik Ürünler',
		'Kozmetik Ürünler',
		'Ayakkabı',
	];
	const handleProductData = (e) => {
		setProductData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	const handleProductDataBrand = (e) => {
		const selectedBrandIndex = brands.findIndex(
			(brand) => brand === e.target.value
		);
		setProductData((prev) => ({
			...prev,
			brand: selectedBrandIndex,
		}));
	};
	const handleProductDataCategory = (e) => {
		const selectedCategoryIndex = categories.findIndex(
			(category) => category === e.target.value
		);
		setProductData((prev) => ({
			...prev,
			category: selectedCategoryIndex,
		}));
	};
	const handleProductSubmit = () => {};
	return (
		<Form className='add-product-form'>
			<Form.Group className='mb-3'>
				<Form.Label htmlFor='textInput'>Ürün İsmi</Form.Label>
				<Form.Control
					onChange={handleProductData}
					name='name'
					placeholder='Ürün İsmi'
				/>
			</Form.Group>
			<Form.Group className='mb-3'>
				<Form.Label>Ürün açıklaması</Form.Label>
				<Form.Control
					onChange={handleProductData}
					name='description'
					as='textarea'
					rows={3}
				/>
			</Form.Group>
			<Row>
				<Form.Group className='mb-3' style={{ maxWidth: '50%' }}>
					<Form.Label>Kategori</Form.Label>
					<Form.Select name='category' onChange={handleProductDataCategory}>
						{categories.map((category, index) => (
							<option key={index}>{category}</option>
						))}
					</Form.Select>
				</Form.Group>
				<Form.Group className='mb-3' style={{ maxWidth: '50%' }}>
					<Form.Label>Marka</Form.Label>
					<Form.Select name='brand' onChange={handleProductDataBrand}>
						{brands.map((brand, index) => (
							<option key={index}>{brand}</option>
						))}
					</Form.Select>
				</Form.Group>
			</Row>
			<Form.Group className='mb-3'>
				<Form.Label>Resim Linki (Opsiyonel)</Form.Label>
				<Form.Control
					onChange={handleProductData}
					name='image'
					placeholder='https://resim-linki.com'
				/>
			</Form.Group>
			<Form.Group className='mb-3'>
				<Form.Label>Fiyat</Form.Label>
				<InputGroup className='mb-3'>
					<InputGroup.Text>₺</InputGroup.Text>
					<Form.Control
						onChange={handleProductData}
						name='price'
						placeholder='00.00'
					/>
				</InputGroup>
			</Form.Group>
			<Button
				type='submit'
				onClick={handleProductSubmit}
				style={{ width: 'max-content', marginInline: 'auto' }}
			>
				Ürünü Ekle
			</Button>
		</Form>
	);
}
export default AddItem;
