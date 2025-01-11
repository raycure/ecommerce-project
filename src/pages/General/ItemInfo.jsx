import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addOrderItem } from '../../redux/Slices/OrderInfoSlice';
import { selectUserType } from '../../redux/Slices/UserInfoSlice';
import { useSearchParams } from 'react-router-dom';
import { useUserInfo } from '../../services/productStore';
import AddItem from '../Users/Seller/AddItem';
import { requestService } from '../../redux/requestService';

function ItemInfo() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userType = useSelector(selectUserType);
	const [searchParams] = useSearchParams();
	const productId = searchParams.get('productId');
	const sellerId = searchParams.get('sellerId');

	const [itemAmount, setItemAmount] = useState(1);
	const url = '/crud/fetchProductInfo';
	const {
		data: Data,
		isLoading,
		isError,
		error,
		isFetching,
		dataUpdatedAt,
	} = useUserInfo(url, { productId, sellerId });
	const data = Data?.mappedResults[0];

	console.log('data', data);

	const productInfo = {
		name: '',
		brand: '',
		description: '',
		image: '',
		stock: 0,
		price: 0,
		sellerId: 0,
		productId: 0,
		seller_productId: 0,
	};
	const handleAmountIncrease = () => {
		if (data.stock <= itemAmount) {
			return false;
		}
		setItemAmount((prev) => prev + 1);
	};
	const handleAmountDecrease = () => {
		if (1 >= itemAmount) {
			return false;
		}
		setItemAmount((prev) => prev - 1);
	};
	const totalPrice = itemAmount * data?.price;

	const handleProductSubmit = () => {
		dispatch(
			addOrderItem({
				// productId: data.productId,
				seller_productId: data.seller_productId,
				// sellerId: productInfo.sellerId,
				amount: itemAmount,
				price: totalPrice,
				item: data,
			})
		);
		navigate(`/cart`, { state: totalPrice });
	};
	async function handleProductDelete() {
		try {
			console.log('product id in handleProductDelete', productId);

			const response = await dispatch(
				requestService({
					method: 'POST',
					endpoint: '/crud/deleteProduct',
					data: { productId },
				})
			);
		} catch (error) {
			console.log('err', error);
		}
	}

	if (!data) return <div>No products found</div>;

	return (
		<section className='item-info-outer-con'>
			<Image
				style={{
					width: '24rem',
					height: '24rem',
					objectFit: 'scale-down',
					margin: 'auto',
				}}
				src={data?.image}
				rounded
			/>
			<section style={{ display: 'grid', padding: '1rem' }}>
				<Card.Text className='mb-0'>{data.brand}</Card.Text>
				<Card.Title className='mb-2'>{data.title}</Card.Title>
				<Card.Text>{data.description}</Card.Text>
				<hr />
				<Card.Title>{data.price} ₺</Card.Title>
				<Card.Text>Kalan stok {data.stock}</Card.Text>

				<Card.Text className='mb-0'>Miktar</Card.Text>
				<div className='quantity-button-container'>
					<button onClick={handleAmountDecrease}>-</button>
					<p className='mb-0'>{itemAmount}</p>
					<button onClick={handleAmountIncrease}>+</button>
				</div>
				<Card.Text className='mb-4'>Toplam fiyat {totalPrice} ₺</Card.Text>

				{/* {userType === 'seller' && userId === productInfo.sellerId ? ( */}
				{userType === 'seller' ? (
					<>
						<Button
							onClick={handleProductDelete}
							style={{ width: '100%', justifySelf: 'end' }}
							variant='danger'
							type='submit'
						>
							Sil
						</Button>
					</>
				) : userType === 'customer' ? (
					<Button
						onClick={handleProductSubmit}
						style={{ width: '100%', justifySelf: 'end' }}
						variant='primary'
						type='submit'
					>
						Sepete Ekle
					</Button>
				) : userType === 'admin' ? (
					<Button
						onClick={handleProductDelete}
						style={{ width: '100%', justifySelf: 'end' }}
						variant='danger'
						type='submit'
					>
						Sil
					</Button>
				) : (
					<></>
				)}
			</section>
			{userType === 'seller' && (
				<AddItem
					buttonType='ürünü düzenele'
					productDataProp={data}
					productId={productId}
				/>
			)}
		</section>
	);
}
export default ItemInfo;
