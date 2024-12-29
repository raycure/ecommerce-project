import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router';

function ItemInfo() {
	const [itemQuantity, setItemQuantity] = useState(1);
	const navigate = useNavigate();
	const productInfo = {
		name: 'iPhone 14',
		brand: 'Apple',
		description: "Apple'ın en son akıllı telefonu, gelişmiş özelliklerle.",
		image:
			'https://productimages.hepsiburada.net/s/376/960-1280/110000393677091.jpg',
		stock: 6,
		price: 200.0,
	};
	const handleQuantityIncrease = () => {
		if (productInfo.stock <= itemQuantity) {
			return false;
		}
		setItemQuantity((prev) => prev + 1);
	};
	const handleQuantityDecrease = () => {
		if (1 >= itemQuantity) {
			return false;
		}
		setItemQuantity((prev) => prev - 1);
	};
	const handleProductSubmit = () => {
		//redux
		navigate('/cart');
	};
	return (
		<section className='item-info-outer-con'>
			<Image
				style={{ width: '24rem', height: '24rem', objectFit: 'scale-down' }}
				src={productInfo.image}
				rounded
			/>
			<section style={{ display: 'grid', padding: '1rem' }}>
				<Card.Text className='mb-0'>{productInfo.brand}</Card.Text>
				<Card.Title className='mb-2'>{productInfo.name}</Card.Title>
				<Card.Text>{productInfo.description}</Card.Text>
				<hr />
				<Card.Title>{productInfo.price} ₺</Card.Title>
				<Card.Text>Kalan stok {productInfo.stock}</Card.Text>

				<Card.Text className='mb-0'>Miktar</Card.Text>
				<div className='quantity-button-container'>
					<button onClick={handleQuantityDecrease}>-</button>
					<p className='mb-0'>{itemQuantity}</p>
					<button onClick={handleQuantityIncrease}>+</button>
				</div>
				<Card.Text className='mb-4'>
					Toplam fiyat {itemQuantity * productInfo.price} ₺
				</Card.Text>

				<Button
					onClick={handleProductSubmit}
					style={{ width: '100%', justifySelf: 'end' }}
					variant='primary'
					type='submit'
				>
					Sepete Ekle
				</Button>
			</section>
		</section>
	);
}
export default ItemInfo;
