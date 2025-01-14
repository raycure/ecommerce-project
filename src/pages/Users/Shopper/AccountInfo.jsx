import React, { useState, useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux';
import { useUserInfo } from '../../../services/productStore';
import { requestService } from '../../../redux/requestService';
function AccountInfo() {
	const url = '/crud/fetchUserInfo';
	const {
		data: account,
		isLoading,
		isError,
		error,
		isFetching,
		dataUpdatedAt,
	} = useUserInfo(url);
	console.log('account', account);

	const userInfo = useSelector((state) => state.userInfo);
	const userType = userInfo.userType;
	// const timeAgo = new Date(dataUpdatedAt).toLocaleTimeString();
	// if (isLoading) return <div>Loading...</div>;
	// if (isError) return <div>Error: {error.message}</div>;

	const [userAccountInfo, setUserAccountInfo] = useState({
		name: '',
		surname: '',
		address: '',
		email: '',
		phone: '',
	});
	useEffect(() => {
		if (account) {
			const response = account.response;

			setUserAccountInfo({
				name: response?.name || '',
				surname: response?.surname || '',
				address: response?.address || '',
				email: response?.email || '',
				phone: response?.phone || '',
				image: response?.image || '',
			});
			setInputFullNameValue(
				`${response?.name || ''} ${response?.surname || ''}`.trim()
			);
		}
	}, [account]);
	useEffect(() => {
		console.log('userAccountInfo', userAccountInfo);
	}, [userAccountInfo]);

	const [inputFullNameValue, setInputFullNameValue] = useState(
		userAccountInfo.name + ' ' + userAccountInfo.surname
	);
	const userPrevData = {
		name: '',
		surname: '',
		address: '',
		email: '',
		phone: '',
		image: '',
	};
	const handleSetName = (e) => {
		const words = inputFullNameValue.trim().split(' ');
		const name = words.slice(0, -1).join(' ');
		const surname = words.slice(-1).join('');

		setUserAccountInfo((prev) => ({
			...prev,
			name: name,
			surname: surname,
		}));
	};
	const handleSetUserAccountInfo = (e) => {
		setUserAccountInfo((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	const dispatch = useDispatch();
	const handleUserAccountInfoUpdate = (e) => {
		e.preventDefault();
		const response = dispatch(
			requestService({
				endpoint: '/crud/patchUserInfo',
				data: userAccountInfo,
				method: 'PATCH',
			})
		);
		console.log('res', response);
	};
	async function handleUserAccountInfoDelete() {
		const response = dispatch(
			requestService({
				endpoint: '/crud/deleteUser',
				method: 'POST',
			})
		);
	}
	return (
		<Form className='account-info-outer-con'>
			<Card.Title>Hesap Bilgilerim</Card.Title>
			<Form.Text>Moon Shop hesabınızı düzenleyin.</Form.Text>
			<hr />
			{userType === 'seller' && (
				<Form.Group
					style={{
						display: 'flex',
						justifyContent: 'center',
						gap: '2rem',
					}}
				>
					<Form.Group
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							width: 'max-content',
						}}
					>
						<Image
							style={{ width: '9rem', height: '9rem', objectFit: 'cover' }}
							src={userAccountInfo.image}
							roundedCircle
						/>
						<Form.Text>Yeni Profil Resmi</Form.Text>
					</Form.Group>
					<Form.Group
						style={{
							height: 'fit-content',
							alignSelf: 'end',
							marginBlock: '1rem',
							width: '100%',
						}}
					>
						<Form.Text>
							Profil resminizi değiştirmek için bulunan alana resmin linkini
							giriniz.
						</Form.Text>
						<Form.Control
							value={userAccountInfo.image}
							type='text'
							placeholder='https://resim-linki.com'
							name='image'
							onChange={handleSetUserAccountInfo}
						/>
					</Form.Group>
				</Form.Group>
			)}
			<Row>
				<Col>
					<Form.Group>
						<Form.Text>
							{userPrevData.name} {userPrevData.surname}
						</Form.Text>
						<FloatingLabel label='Yeni İsim'>
							<Form.Control
								value={inputFullNameValue}
								type='text'
								placeholder='İsim Soyisim'
								onChange={(e) => setInputFullNameValue(e.target.value)}
								onBlur={handleSetName}
							/>
						</FloatingLabel>
					</Form.Group>
				</Col>
				<Col>
					<Form.Group>
						<Form.Text>{userPrevData.phone}</Form.Text>
						<FloatingLabel label='Yeni Telefon'>
							<Form.Control
								value={userAccountInfo.phone}
								type='text'
								placeholder='Telefon'
								name='phone'
								onChange={handleSetUserAccountInfo}
							/>
						</FloatingLabel>
					</Form.Group>
				</Col>
			</Row>
			<Form.Group>
				<Form.Text>{userPrevData.email}</Form.Text>
				<FloatingLabel label='Yeni Email'>
					<Form.Control
						value={userAccountInfo.email}
						type='text'
						placeholder='Email'
						name='email'
						onChange={handleSetUserAccountInfo}
					/>
				</FloatingLabel>
			</Form.Group>
			{userType === 'shopper' && (
				<Form.Group>
					<Form.Text>{userPrevData.address}</Form.Text>
					<FloatingLabel label='Yeni Adres'>
						<Form.Control
							value={userAccountInfo.address}
							type='text'
							placeholder='Adres'
							name='address'
							onChange={handleSetUserAccountInfo}
							as='textarea'
							style={{ height: '100px' }}
						/>
					</FloatingLabel>
				</Form.Group>
			)}
			<hr />
			<div
				style={{
					display: 'flex',
					height: 'max-content',
					margin: '1rem auto ',
					gap: '1rem',
				}}
			>
				<Button
					variant='primary'
					type='submit'
					onClick={(e) => {
						handleUserAccountInfoUpdate(e);
					}}
				>
					Değişiklikleri Kaydet
				</Button>
				<Button
					variant='outline-danger'
					type='submit'
					onClick={handleUserAccountInfoDelete}
				>
					Hesabı Sil
				</Button>
			</div>
		</Form>
	);
}
export default AccountInfo;
