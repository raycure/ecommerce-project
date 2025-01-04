import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

function ItemInfo() {
	const [itemQuantity, setItemQuantity] = useState(1);
	const navigate = useNavigate();
	const userInfo = useSelector((state) => state.userInfo);
	const userType = userInfo.userType;
	const userId = userInfo.userId;
	const productInfo = {
		name: 'iPhone 14',
		brand: 'Apple',
		description: "Apple'ın en son akıllı telefonu, gelişmiş özelliklerle.",
		image:
			'https://productimages.hepsiburada.net/s/376/960-1280/110000393677091.jpg',
		stock: 6,
		price: 200.0,
		sellerId: 123,
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
	const handleProductUpdate = () => {
		navigate('/add-product');
	};
	const handleProductDelete = () => {};
	return (
		<section className='item-info-outer-con'>
			<Image
				style={{
					width: '24rem',
					height: '24rem',
					objectFit: 'scale-down',
					margin: 'auto',
				}}
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

				{userType === 'seller' && userId === productInfo.sellerId ? (
					<>
						<Button
							onClick={handleProductUpdate}
							style={{ width: '100%', justifySelf: 'end' }}
							variant='warning'
							type='submit'
							className='mb-1'
						>
							Ürünü Düzenle
						</Button>
						<Button
							onClick={handleProductDelete}
							style={{ width: '100%', justifySelf: 'end' }}
							variant='danger'
							type='submit'
						>
							Sil
						</Button>
					</>
				) : userType === 'shopper' ? (
					<Button
						onClick={handleProductSubmit}
						style={{ width: '100%', justifySelf: 'end' }}
						variant='primary'
						type='submit'
					>
						Sepete Ekle
					</Button>
				) : userType === 'admin' ? (
					<Button
						onClick={handleProductDelete}
						style={{ width: '100%', justifySelf: 'end' }}
						variant='danger'
						type='submit'
					>
						Sil
					</Button>
				) : (
					<></>
				)}
			</section>
		</section>
	);
}
export default ItemInfo;
