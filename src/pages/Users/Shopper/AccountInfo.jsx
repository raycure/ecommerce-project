import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
function AccountInfo() {
	const userType = 'seller';
	const [userInfo, setUserInfo] = useState({
		name: 'Cemil',
		surname: 'Uçar',
		address: 'Esenyurt, 34510 Esenyurt/İstanbul',
		email: 'ezgitas@gmail.com',
		phone: '05423981654',
		image:
			'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQg_Lj-AwA3TKS-FSwZ8c8V0zDIA4cnGrMGz0tGfAzakmcYhWr6ndm6EXpSrYYXCprXW9d6',
	});
	const userPrevData = {
		name: 'Cemil',
		surname: 'Uçar',
		address: 'Esenyurt, 34510 Esenyurt/İstanbul',
		email: 'ezgitas@gmail.com',
		phone: '05423981654',
		image:
			'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQg_Lj-AwA3TKS-FSwZ8c8V0zDIA4cnGrMGz0tGfAzakmcYhWr6ndm6EXpSrYYXCprXW9d6',
	};
	const [inputFullNameValue, setInputFullNameValue] = useState(
		userInfo.name + ' ' + userInfo.surname
	);
	const handleSetName = (e) => {
		const words = inputFullNameValue.trim().split(' ');
		const name = words.slice(0, -1).join(' ');
		const surname = words.slice(-1).join('');

		setUserInfo((prev) => ({
			...prev,
			name: name,
			surname: surname,
		}));
	};
	const handleSetUserInfo = (e) => {
		setUserInfo((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	const handleUSerInfoUpdate = () => {};
	const handleUSerInfoDelete = () => {};
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
							src={userInfo.image}
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
							value={userInfo.image}
							type='text'
							placeholder='https://resim-linki.com'
							name='image'
							onChange={handleSetUserInfo}
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
								value={userInfo.phone}
								type='text'
								placeholder='Telefon'
								name='phone'
								onChange={handleSetUserInfo}
							/>
						</FloatingLabel>
					</Form.Group>
				</Col>
			</Row>
			<Form.Group>
				<Form.Text>{userPrevData.email}</Form.Text>
				<FloatingLabel label='Yeni Email'>
					<Form.Control
						value={userInfo.email}
						type='text'
						placeholder='Email'
						name='email'
						onChange={handleSetUserInfo}
					/>
				</FloatingLabel>
			</Form.Group>
			{userType === 'shopper' && (
				<Form.Group>
					<Form.Text>{userPrevData.address}</Form.Text>
					<FloatingLabel label='Yeni Adres'>
						<Form.Control
							value={userInfo.address}
							type='text'
							placeholder='Adres'
							name='address'
							onChange={handleSetUserInfo}
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
				<Button variant='primary' type='submit' onClick={handleUSerInfoUpdate}>
					Değişiklikleri Kaydet
				</Button>
				<Button
					variant='outline-danger'
					type='submit'
					onClick={handleUSerInfoDelete}
				>
					Hesabı Sil
				</Button>
			</div>
		</Form>
	);
}
export default AccountInfo;
