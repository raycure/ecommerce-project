import React, { useState } from 'react';
import CategoriesBar from '../../../components/CategoriesBar';
import ProductList from '../../../components/ProductList';
import '../../Main/Main.css';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import { FaCircleCheck } from 'react-icons/fa6';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router';
function Shop() {
	const [selectedCategory, setSelectedCategory] = useState(null);
	const sellerName = 'Cem Balcı'; //normalde id
	const sellerVerified = true;
	const sellerBanned = false;
	const userType = 'seller'; //seller, shopper, admin
	const buttonConStyle = {
		display: 'flex',
		height: 'max-content',
		margin: 'auto 1rem auto auto',
		gap: '1rem',
	};
	return (
		<section>
			<Container
				style={{
					backgroundColor: '#212529',
					padding: '0.5rem',
					color: 'white',
					display: 'flex',
					gap: '1rem',
				}}
			>
				<Image
					style={{ width: '7rem', height: '7rem', objectFit: 'cover' }}
					src='https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQg_Lj-AwA3TKS-FSwZ8c8V0zDIA4cnGrMGz0tGfAzakmcYhWr6ndm6EXpSrYYXCprXW9d6'
					roundedCircle
				/>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
					}}
				>
					<Card.Title>
						{[
							sellerName,
							' ',
							sellerVerified && <FaCircleCheck color='blue' />,
						]}
					</Card.Title>
					{userType !== 'seller' ? (
						sellerVerified ? (
							<Card.Text>
								Bu doğrulanmış bir satıcıdır, alışveriş yaparken gönül
								rahatlığıyla devam edebilirsiniz.
							</Card.Text>
						) : !sellerBanned ? (
							<Card.Text>
								Bu satıcı henüz doğrulanamamıştır, doğrulanmamış satıcılardan
								alışveriş yaparken dikkatli olunuz.
							</Card.Text>
						) : (
							<Card.Text>
								Satış yasaklı satıcı, maalesef bu satıcıdan alışveriş
								yapamazsınız.
							</Card.Text>
						)
					) : (
						<Card.Text>
							Bu sizin dükkanınız, eğer bilgilerinizde bir değişiklik yapmak
							istiyorsanız <Link to='/account'>Hesabım</Link> linkini
							kullanabilirsiniz.
						</Card.Text>
					)}
				</div>
				{userType === 'seller' ? (
					<div style={buttonConStyle}>
						<Button variant='warning' href='/add-product'>
							Ürün Ekle
						</Button>
					</div>
				) : (
					userType === 'admin' && (
						<div style={buttonConStyle}>
							<Button variant='success'>Doğrula</Button>
							<Button variant='danger'>Satış Yasağı</Button>
						</div>
					)
				)}
			</Container>

			{!sellerBanned && (
				<section>
					<CategoriesBar
						selectedCategory={selectedCategory}
						setSelectedCategory={setSelectedCategory}
					/>
					<ProductList
						sellerId={sellerName}
						selectedCategory={selectedCategory}
					/>
				</section>
			)}
		</section>
	);
}
export default Shop;
