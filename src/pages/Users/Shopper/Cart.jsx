import React from 'react';
import OrderItem from '../../../components/OrderItem';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../../redux/Slices/OrderInfoSlice';
function Cart() {
	const navigate = useNavigate();
	const orderItems = useSelector(selectCartItems).orderItems;
	const userInfo = useSelector((state) => state.userInfo.user);
	console.log('userInfo', userInfo);

	const orderDate = new Date();
	const userAddress = userInfo?.address;
	let allOrdersTotal = 0;

	console.log('orderItems', orderItems);
	orderItems.map((orderItem) => {
		allOrdersTotal = orderItem.price + allOrdersTotal;
	});

	const handleCartSubmit = () => {
		navigate('/purchase', { state: allOrdersTotal });
	};

	return (
		<section className='cart-outer-container'>
			<div>
				{orderItems.map((orderItem, index) => (
					<OrderItem key={index} orderData={orderItem.item} />
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
					<Card.Text>
						Toplam Ödeme Miktarı: {allOrdersTotal.toFixed(2)}₺
					</Card.Text>
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
