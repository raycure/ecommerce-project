import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { useUserInfo } from '../../services/productStore';

function Orders() {
	const url = '/crud/fetchOrders';
	const {
		data: Data,
		isLoading,
		isError,
		error,
		isFetching,
		dataUpdatedAt,
	} = useUserInfo(url);
	if (!Data) return <div>No products found</div>;

	return (
		<Card className='purchase-outer-container'>
			<Card.Body>
				<Form style={{ padding: '0 1rem' }}>
					<div>
						{Data?.mappedResults.map((orderData, index) => {
							return (
								<section className='cart-order-item-outer-container'>
									<Image
										style={{
											width: '8rem',
											height: '8rem',
											objectFit: 'scale-down',
										}}
										src={orderData.image}
										rounded
									/>
									<div className='cart-order-item-info'>
										<Card.Title>{orderData.title}</Card.Title>
										<Card.Text className='mb-0'>
											{orderData?.description}
										</Card.Text>
										<Card.Text>{orderData.sellerName}</Card.Text>
										<span
											style={{
												display: 'flex',
												alignItems: 'center',
												gap: '1rem',
											}}
										>
											<Card.Text className='mb-0'>
												Ürün Miktarı: {orderData?.amount} tane
											</Card.Text>
											<Card.Text className='mb-0'>
												Ürün Fiyatı: {orderData.price} ₺
											</Card.Text>
										</span>
									</div>
								</section>
							);
						})}
					</div>
				</Form>
			</Card.Body>
		</Card>
	);
}
export default Orders;
