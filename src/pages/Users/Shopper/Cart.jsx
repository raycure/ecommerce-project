import React from 'react';
import OrderItem from '../../../components/OrderItem';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';
function Cart() {
	const navigate = useNavigate();
	const orderData = [
		{
			productId: '',
			price: 20,
			amount: 5,
			sellerId: '',
			seller_productId: '',
		},
		{
			productId: '',
			price: 40,
			amount: 2,
			sellerId: '',
			seller_productId: '',
		},
		{
			productId: '',
			price: 50,
			amount: 8,
			sellerId: '',
			seller_productId: '',
		},
	];
	const orderDate = new Date();
	const userAddress = 'Çağlayan, 34403 Kağıthane/İstanbul';
	let orderAmount = 0;
	orderData.map((orderItem) => {
		orderAmount = orderAmount + orderItem.price * orderItem.amount;
	});
	const handleCartSubmit = () => {
		navigate('/purchase');
	};
	return (
		<section className='cart-outer-container'>
			<div>
				{orderData.map((orderItem, index) => (
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
					<Card.Text>Toplam Ödeme Miktarı: {orderAmount}₺</Card.Text>
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
