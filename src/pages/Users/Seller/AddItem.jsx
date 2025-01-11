import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import brands from '../../../assets/Brands';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserType } from '../../../redux/Slices/UserInfoSlice';
import { useNavigate } from 'react-router';
import { requestService } from '../../../redux/requestService';
function AddItem({ buttonType, productDataProp, productId }) {
	const userType = useSelector(selectUserType);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	if (userType !== 'seller') {
		navigate('/');
	}
	const [productData, setProductData] = useState({
		name: productDataProp?.title || '',
		description: productDataProp?.description || '',
		image: productDataProp?.image || '',
		stock: productDataProp?.stock || 0,
		price: productDataProp?.price || 0,
		category: productDataProp?.categoryIndex || 1,
		brand: productDataProp?.brandIndex || 1,
	});

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
		const selectedBrandIndex =
			brands.findIndex((brand) => brand === e.target.value) + 1;
		setProductData((prev) => ({
			...prev,
			brand: selectedBrandIndex,
		}));
	};
	const handleProductDataCategory = (e) => {
		let selectedCategoryIndex =
			categories.findIndex((category) => category === e.target.value) + 1;
		setProductData((prev) => ({
			...prev,
			category: selectedCategoryIndex,
		}));
	};

	async function handleProductSubmit(e) {
		e.preventDefault();
		let url =
			productDataProp === undefined
				? 'crud/createProduct'
				: 'crud/updateProduct';
		let method = productDataProp === undefined ? 'POST' : 'PATCH';
		const response = await dispatch(
			requestService({
				data: { productData, productId },
				endpoint: url,
				method: method,
			})
		);
		console.log('response in add ite', response);
	}
	return (
		<Form className='add-product-form'>
			<Form.Group className='mb-3'>
				<Form.Label htmlFor='textInput'>Ürün İsmi</Form.Label>
				<Form.Control
					onChange={handleProductData}
					name='name'
					value={productData.name}
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
					value={productData.description}
				/>
			</Form.Group>
			<Row>
				<Form.Group className='mb-3' style={{ maxWidth: '50%' }}>
					<Form.Label>Kategori</Form.Label>
					<Form.Select
						name='category'
						onChange={handleProductDataCategory}
						value={categories[productData.category - 1]}
					>
						{categories.map((category, index) => (
							<option key={index}>{category}</option>
						))}
					</Form.Select>
				</Form.Group>
				<Form.Group className='mb-3' style={{ maxWidth: '50%' }}>
					<Form.Label>Marka</Form.Label>
					<Form.Select
						name='brand'
						onChange={handleProductDataBrand}
						value={brands[productData.brand - 1]}
					>
						{brands.map((brand, index) => (
							<option key={index}>{brand}</option>
						))}
					</Form.Select>
				</Form.Group>
			</Row>
			<Form.Group className='mb-3'>
				<Form.Label>Resim Linki</Form.Label>
				<Form.Control
					onChange={handleProductData}
					name='image'
					value={productData.image}
					placeholder='https://resim-linki.com'
				/>
			</Form.Group>
			<Form.Group className='mb-3'>
				<Form.Label>Fiyat</Form.Label>
				<InputGroup className='mb-3'>
					<InputGroup.Text>₺</InputGroup.Text>
					<Form.Control
						onChange={handleProductData}
						value={productData.price}
						name='price'
						placeholder='00.00'
					/>
				</InputGroup>
			</Form.Group>
			<Form.Group className='mb-3'>
				<Form.Label>Stok</Form.Label>
				<InputGroup className='mb-3'>
					<Form.Control
						onChange={handleProductData}
						name='stock'
						value={productData.stock}
						placeholder='0'
					/>
				</InputGroup>
			</Form.Group>
			<Button
				type='submit'
				onClick={(e) => {
					handleProductSubmit(e);
				}}
				style={{ width: 'max-content', marginInline: 'auto' }}
			>
				{buttonType || 'Ürünü Ekle'} {/* Use the prop with a default value */}
			</Button>
		</Form>
	);
}
export default AddItem;
