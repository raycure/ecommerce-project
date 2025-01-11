import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectCartItems,
	updateOrderDetails,
} from '../../../redux/Slices/OrderInfoSlice';
import { requestService } from '../../../redux/requestService';
function Purchase() {
	//once orderTable için customerId ve orderDate
	//sonra orderItemTable için orderId, seller_productId ve amount
	//sonra paymentTable için methodtype, customerId ve paymentTotal
	//paymentTotal otomatik hesaplanıp kaydedildigi için atmaya gerek yok
	const orderDate = new Date();
	const location = useLocation();
	const paymentTotal = location.state;
	const dispatch = useDispatch();
	const orderInfo = useSelector((state) => state.orderInfo);
	const orderItems = useSelector(selectCartItems).orderItems;
	const orderData = orderItems.map((item) => ({
		productId: item.item.productId,
		sellerId: item.item.sellerId,
		amount: item.amount,
		seller_productId: item.item.seller_productId,
	}));

	const paymentMethods = [
		//bu databaseten gelen
		'Credit Card',
		'Debit Card',
		'PayPal',
		'Bitpay',
		'Cash on Delivery',
		'Apple Pay',
		'Google Pay',
		'Bitcoin',
		'Stripe',
		'AmazonPay',
	];
	const paymentMethodData = [
		{
			method: 'Credit Card',
			logo: ['/paymentMethods/Visa.png', '/paymentMethods/Mastercard.png'],
		},
		{
			method: 'Debit Card',
			logo: ['/paymentMethods/Visa.png', '/paymentMethods/Mastercard.png'],
		},
		{ method: 'PayPal', logo: ['/paymentMethods/PayPal.png'] },
		{ method: 'Bitpay', logo: ['/paymentMethods/Bitpay.png'] },
		{ method: 'Cash on Delivery' },
		{ method: 'Apple Pay', logo: ['/paymentMethods/ApplePay.png'] },
		{ method: 'Google Pay', logo: ['/paymentMethods/GooglePay.png'] },
		{ method: 'Bitcoin', logo: ['/paymentMethods/Bitcoin.png'] },
		{ method: 'Stripe', logo: ['/paymentMethods/Stripe.png'] },
		{ method: 'AmazonPay', logo: ['/paymentMethods/AmazonPay.png'] },
	]; //resimler var diye burda dursun
	const [selectedMethod, setSelectedMethod] = useState('Credit Card');
	const handleMethodClick = (method) => {
		setSelectedMethod(method);
	};
	async function handlePaymentSubmit() {
		dispatch(
			requestService({
				method: 'POST',
				endpoint: '/crud/purchase',
				data: { orderData, selectedMethod },
			})
		);
		// dispatch(
		// 	updateOrderDetails({
		// 		orderId: 12345,
		// 		methodtype: selectedMethod,
		// 		paymentamount: paymentTotal,
		// 	})
		// );
	}
	return (
		<Card className='purchase-outer-container'>
			<Card.Header>
				<Card.Title>Ödeme Formu</Card.Title>
				<Card.Text>Tüm ödeme yöntemlemlerimiz güvenlidir.</Card.Text>
			</Card.Header>
			<Card.Body>
				<Card.Title>Toplam Ödeme: {paymentTotal}</Card.Title>
				<Card.Text>
					Sipariş tarihi: {orderDate.toLocaleDateString('tr')}
				</Card.Text>
				<Card.Text>Lütfen bir ödeme yöntemi seçiniz.</Card.Text>
				<Form style={{ padding: '0 1rem' }}>
					<div className='purchase-method-outer-container'>
						{paymentMethods.map((method, index) => {
							const methodData = paymentMethodData.find((methodData) => {
								return methodData.method === method;
							});
							return (
								<div
									onClick={() => handleMethodClick(methodData.method)}
									className='purchase-method-container	'
									style={
										methodData.method === selectedMethod
											? { backgroundColor: 'rgba(253, 165, 248, 0.26)' }
											: {}
									}
									key={index}
								>
									<Form.Check
										checked={selectedMethod === methodData.method}
										type='radio'
										key={index}
										readOnly
									/>
									{methodData.method}
									<div style={{ marginLeft: 'auto' }}>
										{methodData?.logo &&
											methodData.logo.map((logo, logoIndex) => (
												<Image
													style={{ width: '3rem' }}
													src={logo}
													alt={`${method} logo`}
													key={logoIndex}
												/>
											))}
									</div>
								</div>
							);
						})}
					</div>
					<Button
						onClick={handlePaymentSubmit}
						style={{ width: '100%' }}
						variant='primary'
					>
						Ödemeyi Tamamla
					</Button>
				</Form>
			</Card.Body>
		</Card>
	);
}
export default Purchase;
