import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addOrderItem, removeOrderItem } from '../redux/Slices/OrderInfoSlice';
function orderItem({ orderItem }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const orderItemData = {
		image:
			'https://hips.hearstapps.com/hmg-prod/images/shrek-forever-after-1587549453.jpg?crop=0.676xw:0.901xh;0.0969xw,0&resize=640:*',
		productName: 'Iphone 14',
		productDescription:
			"Apple'ın en son akıllı telefonu, gelişmiş özelliklerle.",
		sellerName: 'Camil Boyundur',
		stock: 11,
	};
	const handleOrderItemDelete = () => {
		dispatch(
			removeOrderItem({
				seller_productId: orderItem.seller_productId,
			})
		);
	};
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
					<Card.Text className='mb-0'>
						Ürün Miktarı: {orderItem.amount} tane
					</Card.Text>
					<Card.Text className='mb-0'>
						Ürün Fiyatı: {orderItem.amount * orderItem.price} ₺
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
