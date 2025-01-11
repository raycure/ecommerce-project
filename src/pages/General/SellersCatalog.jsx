import React, { useState } from 'react';
import CategoriesBar from '../../../components/CategoriesBar';
import ProductList from '../../../components/ProductList';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import { FaCircleCheck } from 'react-icons/fa6';
import Button from 'react-bootstrap/Button';
import { data, Link } from 'react-router';
import { useSelector } from 'react-redux';
import { useProducts } from '../../../services/productStore';
import { useEffect } from 'react';
import { selectUserType } from '../../../redux/Slices/UserInfoSlice';
import { useSearchParams } from 'react-router';
function Shop() {
	const [selectedCategory, setSelectedCategory] = useState(null);
	const userInfo = useSelector((state) => state.userInfo);
	const userType = useSelector(selectUserType);
	const userId = userInfo.userId;
	const [sellerInfo, setSellerInfo] = useState({
		sellerName: '',
		sellerId: null, // this stays null
		sellerVerified: false,
		sellerBanned: false,
	});
	const buttonConStyle = {
		display: 'flex',
		height: 'max-content',
		margin: 'auto 1rem auto auto',
		gap: '1rem',
	};

	async function updateSeller() {}
	const [searchParams] = useSearchParams();
	const sellerId = searchParams.get('sellerId');
	console.log('sellerId in shop', sellerId);
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
							sellerInfo.sellerName,
							' ',
							sellerInfo.sellerVerified && (
								<FaCircleCheck color='deepskyblue' />
							),
						]}
					</Card.Title>
					{userType !== 'seller' ? (
						sellerInfo.sellerVerified ? (
							<Card.Text>
								Bu doğrulanmış bir satıcıdır, alışveriş yaparken gönül
								rahatlığıyla devam edebilirsiniz.
							</Card.Text>
						) : !sellerInfo.sellerBanned ? (
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
					) : userType === 'seller' && userId === sellerInfo.sellerId ? (
						<Card.Text>
							Bu sizin dükkanınız, eğer bilgilerinizde bir değişiklik yapmak
							istiyorsanız <Link to='/account'>Hesabım</Link> linkini
							kullanabilirsiniz.
						</Card.Text>
					) : (
						<></>
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
							<Button variant='success' onClick={updateSeller}>
								Doğrula
							</Button>
							<Button variant='danger' onClick={updateSeller}>
								Satış Yasağı
							</Button>
						</div>
					)
				)}
			</Container>

			{!sellerInfo.sellerBanned && (
				<section>
					<CategoriesBar
						selectedCategory={selectedCategory}
						setSelectedCategory={setSelectedCategory}
					/>
					<ProductList
						sellerId={sellerInfo.sellerName}
						test={sellerId}
						selectedCategory={selectedCategory}
					/>
				</section>
			)}
		</section>
	);
}
export default Shop;
