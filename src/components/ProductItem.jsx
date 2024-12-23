import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
function ProductItem({ title, category, price, seller, stock, brand }) {
	//product id de alınır
	return (
		<Card style={{ width: '12rem' }}>
			<Card.Img
				variant='top'
				style={{ height: '16rem', objectFit: 'cover' }}
				src='https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQg_Lj-AwA3TKS-FSwZ8c8V0zDIA4cnGrMGz0tGfAzakmcYhWr6ndm6EXpSrYYXCprXW9d6'
			/>
			<Card.Body>
				<Card.Title>{title}</Card.Title>
				<Card.Subtitle className='mb-2 text-muted'>{brand}</Card.Subtitle>
				{/* <Card.Text></Card.Text> */}
				<Row>
					<Card.Link href='#'>{seller}</Card.Link>
				</Row>
				<Button
					href='/item-info'
					variant='primary'
					style={{ marginInline: '25%', marginTop: '0.5rem' }}
				>
					İncele
				</Button>
			</Card.Body>
		</Card>
	);
}
export default ProductItem;
