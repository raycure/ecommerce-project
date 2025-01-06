import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addOrderItem } from '../../redux/Slices/OrderInfoSlice';
function ItemInfo() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userInfo = useSelector((state) => state.userInfo);
	const userType = userInfo.userType;
	console.log('userType', userType);

	const userId = userInfo.userId;
	const [itemAmount, setItemAmount] = useState(1);
	const productInfo = {
		name: 'iPhone 14',
		brand: 'Apple',
		description: "Apple'ın en son akıllı telefonu, gelişmiş özelliklerle.",
		image:
			'https://productimages.hepsiburada.net/s/376/960-1280/110000393677091.jpg',
		stock: 6,
		price: 200.0,
		sellerId: 123,
		productId: 12,
		seller_productId: 1,
	}; //bunlar değişen bilgiler değil o yuzden sadece amount stateli
	const handleAmountIncrease = () => {
		if (productInfo.stock <= itemAmount) {
			return false;
		}
		setItemAmount((prev) => prev + 1);
	};
	const handleAmountDecrease = () => {
		if (1 >= itemAmount) {
			return false;
		}
		setItemAmount((prev) => prev - 1);
	};
	const handleProductSubmit = () => {
		dispatch(
			addOrderItem({
				productId: productInfo.productId,
				seller_productId: productInfo.seller_productId,
				sellerId: productInfo.sellerId,
				amount: itemAmount,
				price: productInfo.price,
			})
		);
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
					<button onClick={handleAmountDecrease}>-</button>
					<p className='mb-0'>{itemAmount}</p>
					<button onClick={handleAmountIncrease}>+</button>
				</div>
				<Card.Text className='mb-4'>
					Toplam fiyat {itemAmount * productInfo.price} ₺
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
