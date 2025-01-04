import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { FaCircleCheck } from 'react-icons/fa6';
import { useNavigate } from 'react-router';
import { IoTrashOutline } from 'react-icons/io5';
function ProductItem({ product }) {
	const navigate = useNavigate();
	//product id de alınır
	const userType = 'admin';
	const handleProductSelect = () => {
		navigate('/item-info');
	};
	const handleProductDelete = () => {};
	return (
		<Card style={{ width: '12rem' }}>
			<Card.Img
				variant='top'
				style={{ height: '16rem', objectFit: 'scale-down' }}
				src='https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQg_Lj-AwA3TKS-FSwZ8c8V0zDIA4cnGrMGz0tGfAzakmcYhWr6ndm6EXpSrYYXCprXW9d6'
			/>
			<Card.Body>
				<Card.Title>{product.title}</Card.Title>
				<Card.Subtitle className='mb-2 text-muted'>
					{product.brand}
				</Card.Subtitle>
				<Row>
					<Card.Link
						href='/shop' //to do hold seller Id in redux
					>
						{product.seller} {product.sellerVerified && <FaCircleCheck />}
					</Card.Link>
				</Row>
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
				{userType === 'admin' && (
					<Button
						className='mt-1'
						onClick={handleProductDelete}
						variant='danger'
						style={{
							width: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: '3px',
						}}
					>
						<IoTrashOutline /> Sil
					</Button>
				)}
			</Card.Body>
		</Card>
	);
}
export default ProductItem;
