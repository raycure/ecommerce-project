import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { FaCircleCheck } from 'react-icons/fa6';
import { useNavigate } from 'react-router';
import { IoTrashOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { selectUserType } from '../redux/Slices/UserInfoSlice';
function ProductItem({ product }) {
	const userType = useSelector(selectUserType);
	const navigate = useNavigate();
	const handleProductSelect = () => {
		navigate(
			`/item-info/?productId=${product.productId}&sellerId=${product.sellerId}`
		);
	};
	const handleSellerSelect = () => {
		navigate(
			`/shop/?productId=${product.productId}&sellerId=${product.sellerId}`
		);
	};
	return (
		<Card style={{ width: '12rem' }}>
			<Card.Img
				variant='top'
				style={{ height: '16rem', objectFit: 'scale-down' }}
				src={product.image}
			/>
			<Card.Body>
				<Card.Title>
					{product.title} {userType === 'admin' && product.price + '₺'}
				</Card.Title>
				<Card.Subtitle className='mb-2 text-muted'>
					{product.brand}
				</Card.Subtitle>
				<Card.Subtitle className='mb-2 text-muted'>
					{userType === 'seller' && ' ' + product.price + '₺'}
				</Card.Subtitle>
				{userType !== 'seller' && (
					<Row>
						<Card.Link onClick={handleSellerSelect}>
							{product.sellerFullName}{' '}
							{product.sellerVerified === 1 && <FaCircleCheck />}
						</Card.Link>
					</Row>
				)}
				{userType === 'customer' && (
					<Button
						className='mt-1'
						onClick={handleProductSelect}
						variant='primary'
						style={{
							width: '100%',
						}}
					>
						{product.price} ₺
					</Button>
				)}

				{userType === 'seller' && (
					<Button
						className='mt-1'
						onClick={handleProductSelect}
						variant='primary'
						style={{
							width: '100%',
						}}
					>
						Düzenle
					</Button>
				)}
				{userType === 'admin' && (
					<Button
						className='mt-1'
						onClick={handleProductSelect}
						variant='danger'
						style={{
							width: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: '3px',
						}}
					>
						İncele
					</Button>
				)}
			</Card.Body>
		</Card>
	);
}
export default ProductItem;
