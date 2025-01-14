import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { useUserInfo } from '../../services/productStore';
import OrderItem from '../../../src/components/OrderItem';

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
	console.log('ORDERES', Data);

	if (!Data) return <div>No products found</div>;

	return (
		<Card className='purchase-outer-container'>
			<Card.Body>
				<Form style={{ padding: '0 1rem' }}>
					<div>
						{Data?.mappedResults.map((orderData, index) => {
							return <OrderItem key={index} orderData={orderData} />;
						})}
					</div>
				</Form>
			</Card.Body>
		</Card>
	);
}
export default Orders;
