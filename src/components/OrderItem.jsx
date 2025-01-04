import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';
import { useNavigate } from 'react-router';
function orderItem({ orderItem }) {
	const [itemQuantity, setItemQuantity] = useState(orderItem.amount);
	const navigate = useNavigate();
	const orderItemData = {
		image:
			'https://hips.hearstapps.com/hmg-prod/images/shrek-forever-after-1587549453.jpg?crop=0.676xw:0.901xh;0.0969xw,0&resize=640:*',
		productName: 'Iphone 14',
		productDescription:
			"Apple'ın en son akıllı telefonu, gelişmiş özelliklerle.",
		sellerName: 'Camil Boyundur',
		stock: 11,
	};
	const handleQuantityIncrease = () => {
		if (orderItemData.stock <= itemQuantity) {
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
	const handleOrderItemDelete = () => {};
	const handleSellerNavigate = () => {
		navigate('/shop');
	};
	return (
		<section className='cart-order-item-outer-container'>
			<Image
				style={{ width: '8rem', height: '8rem', objectFit: 'scale-down' }}
				src={orderItemData.image}
				rounded
			/>
			<div className='cart-order-item-info'>
				<Card.Title>{orderItemData.productName}</Card.Title>
				<Card.Text className='mb-0'>
					{orderItemData.productDescription}
				</Card.Text>
				<Card.Link onClick={handleSellerNavigate}>
					{orderItemData.sellerName}
				</Card.Link>
				<span style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
					<div className='quantity-button-container'>
						<button onClick={handleQuantityDecrease}>-</button>
						<p className='mb-0'>{itemQuantity}</p>
						<button onClick={handleQuantityIncrease}>+</button>
					</div>
					<Card.Text className='mb-0'>
						Toplam Ürün Fiyatı: {itemQuantity * orderItem.price} ₺
					</Card.Text>
				</span>
			</div>
			<CloseButton
				style={{ alignSelf: 'flex-start' }}
				onClick={handleOrderItemDelete}
			/>
		</section>
	);
}
export default orderItem;
