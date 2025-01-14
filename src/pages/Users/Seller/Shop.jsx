import React, { useState } from 'react';
import CategoriesBar from '../../../components/CategoriesBar';
import ProductList from '../../../components/ProductList';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import { FaCircleCheck } from 'react-icons/fa6';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useProducts } from '../../../services/productStore';
import { selectUserType } from '../../../redux/Slices/UserInfoSlice';
import { useSearchParams } from 'react-router';
import { requestService } from '../../../redux/requestService';
function Shop() {
	const [selectedCategory, setSelectedCategory] = useState(null);
	const userInfo = useSelector((state) => state.userInfo);
	const userType = useSelector(selectUserType);
	console.log('userInfo', userInfo);

	const userId = userInfo.userId;
	const buttonConStyle = {
		display: 'flex',
		height: 'max-content',
		margin: 'auto 1rem auto auto',
		gap: '1rem',
	};

	const dispatch = useDispatch();

	const [searchParams] = useSearchParams();
	const sellerId = searchParams.get('sellerId') || userId;
	console.log('sellerId', sellerId);

	async function updateSeller(updateType) {
		try {
			console.log('updateType', updateType);
			const response = dispatch(
				requestService({
					method: 'POST',
					endpoint: '/crud/updateSeller',
					data: { sellerId, updateType },
				})
			);
		} catch (error) {
			console.log('err', error);
		}
	}

	const {
		data: Data,
		isLoading,
		isError,
		error,
		isFetching,
		dataUpdatedAt,
	} = useProducts({ sellerId });

	const sellerInfo = Data?.mappedResults[0];
	console.log('sellerInfo', sellerInfo);
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
					src={sellerInfo?.sellerImage}
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
						{sellerInfo?.sellerFullName}{' '}
						{[
							sellerInfo?.sellerVerified === 1 && (
								<FaCircleCheck color='deepskyblue' />
							),
						]}
					</Card.Title>
					{userType !== 'seller' ? (
						sellerInfo?.sellerVerified && !sellerInfo.isSellerBanned ? (
							<Card.Text>
								Bu doğrulanmış bir satıcıdır, alışveriş yaparken gönül
								rahatlığıyla devam edebilirsiniz.
							</Card.Text>
						) : !sellerInfo?.sellerVerified ? (
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
					) : userType === 'seller' && sellerInfo?.sellerId ? (
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
							<Button
								variant='success'
								onClick={() => {
									updateSeller('verified');
								}}
							>
								Doğrula
							</Button>
							<Button
								variant='danger'
								onClick={() => {
									updateSeller('banned');
								}}
							>
								Satış Yasağı
							</Button>
						</div>
					)
				)}
			</Container>

			<section>
				<CategoriesBar
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
				/>
				<ProductList Data={Data} selectedCategory={selectedCategory} />
			</section>
		</section>
	);
}
export default Shop;
