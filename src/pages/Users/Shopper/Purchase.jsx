import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
function Purchase() {
	//once orderTable için customerId ve orderDate
	//sonra orderItemTable için orderId, seller_productId ve amount
	//sonra paymentTable için methodtype, customerId ve paymentAmount
	//paymentAmount otomatik hesaplanıp kaydedildigi için atmaya gerek yok
	const orderData = [
		{ productId: '', price: 20, amount: 5, sellerId: '', seller_productId: '' },
		{ productId: '', price: 40, amount: 2, sellerId: '', seller_productId: '' },
		{ productId: '', price: 50, amount: 8, sellerId: '', seller_productId: '' },
	];
	const orderDate = new Date();
	let paymentAmount = 0;
	orderData.map((orderItem) => {
		paymentAmount = paymentAmount + orderItem.price * orderItem.amount;
	});

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
	];
	const [selectedMethod, setSelectedMethod] = useState('Credit Card');
	const handleMethodClick = (method) => {
		setSelectedMethod(method);
	};
	const handlePaymentSubmit = () => {};
	return (
		<Card className='purchase-outer-container'>
			<Card.Header>
				<Card.Title>Ödeme Formu</Card.Title>
				<Card.Text>Tüm ödeme yöntemlemlerimiz güvenlidir.</Card.Text>
			</Card.Header>
			<Card.Body>
				<Card.Title>Toplam Ödeme: {paymentAmount}</Card.Title>
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
