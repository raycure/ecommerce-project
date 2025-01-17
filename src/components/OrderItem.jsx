import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addOrderItem, removeOrderItem } from '../redux/Slices/OrderInfoSlice';
function orderItem({ orderData }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleOrderItemDelete = () => {
		dispatch(
			removeOrderItem({
				seller_productId: orderData.seller_productId,
			})
		);
	};

	console.log('orderData', orderData);

	const handleSellerNavigate = () => {
		navigate('/shop');
	};
	return (
		<section className='cart-order-item-outer-container'>
			<Image
				style={{ width: '8rem', height: '8rem', objectFit: 'scale-down' }}
				src={orderData.item?.image}
				rounded
			/>
			<div className='cart-order-item-info'>
				<Card.Title>{orderData.item?.title}</Card.Title>
				<Card.Text className='mb-0'>{orderData?.description}</Card.Text>
				<Card.Link onClick={handleSellerNavigate}>
					{orderData.item?.seller}
				</Card.Link>
				<span style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
					<Card.Text className='mb-0'>
						Ürün Miktarı: {orderData?.amount} tane
					</Card.Text>
					<Card.Text className='mb-0'>
						Ürün Fiyatı: {orderData.item?.price} ₺
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
