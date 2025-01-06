import React from 'react';
import OrderItem from '../../../components/OrderItem';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
function Cart() {
	const navigate = useNavigate();
	const orderInfo = useSelector((state) => state.orderInfo);
	const orderItems = orderInfo.orderItems;
	const orderDate = new Date();
	const userAddress = 'Çağlayan, 34403 Kağıthane/İstanbul';
	let orderTotal = 0;
	orderItems.map((orderItem) => {
		orderTotal = orderTotal + orderItem.price * orderItem.amount;
	});
	const handleCartSubmit = () => {
		navigate('/purchase', { state: orderTotal });
	};
	return (
		<section className='cart-outer-container'>
			<div>
				{orderItems.map((orderItem, index) => (
					<OrderItem key={index} orderItem={orderItem} />
				))}
			</div>
			<Card style={{ padding: '1rem 0.5rem', height: 'max-content' }}>
				<Card.Body>
					<Card.Title>Sipariş Özeti</Card.Title>
					<hr />
					<Card.Text className='mb-1'>Sipariş Adresi: {userAddress}</Card.Text>
					<Card.Text>
						Sipariş tarihi: {orderDate.toLocaleDateString('tr')}
					</Card.Text>
					<Card.Text>Toplam Ödeme Miktarı: {orderTotal}₺</Card.Text>
					<hr />
					<Button
						style={{ width: '100%' }}
						onClick={handleCartSubmit}
						variant='primary'
					>
						Ödemeyi Tamamla
					</Button>
				</Card.Body>
			</Card>
		</section>
	);
}
export default Cart;
