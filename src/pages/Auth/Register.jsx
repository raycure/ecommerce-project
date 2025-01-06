import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { MdOutlineVpnKey } from 'react-icons/md';
import './Auth.css';
import { requestService } from '../../redux/requestService';
import { useDispatch } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/requestSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
function Register() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [registerForm, setRegisterForm] = useState({
		name: 'dsa',
		surname: 'dsa',
		password: 'Cantsayfs13',
		userType: 'customer',
	});
	console.log('registerForm', registerForm);
	const handleRegisterForm = (e) => {
		setRegisterForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	let isLoggedIn = useSelector(selectIsLoggedIn);
	useEffect(() => {
		console.log('isLoggedIn', isLoggedIn);
	}, [isLoggedIn]);

	async function handleFormSubmit() {
		const response = await dispatch(
			requestService({
				data: registerForm,
				endpoint: 'user/register',
				method: 'POST',
			})
		);
		if (response.payload.status === 200) {
			console.log('setting access token in register');

			localStorage.setItem('accessToken', response.payload.data.accessToken);
			navigate('/');
		}
	}
	return (
		<Form className='authentication-form'>
			<FloatingLabel
				controlId='floatingInput'
				label='Kullanıcı tipi'
				className='mb-3'
			>
				<Form.Select
					onChange={handleRegisterForm}
					defaultValue='customer'
					name='userType'
					required
				>
					<option value='customer'>Alıcı</option>
					<option value='seller'>Satıcı</option>
				</Form.Select>
			</FloatingLabel>
			<span className='authentication-form-inner-con'>
				<FloatingLabel controlId='floatingInput' label='Ad' className='mb-3'>
					<Form.Control
						required
						onChange={handleRegisterForm}
						name='name'
						type='text'
						placeholder='Ad'
					/>
				</FloatingLabel>
				<FloatingLabel controlId='floatingInput' label='Soyad' className='mb-3'>
					<Form.Control
						required
						onChange={handleRegisterForm}
						name='surname'
						type='text'
						placeholder='Soyad'
					/>
				</FloatingLabel>
			</span>
			<FloatingLabel
				controlId='floatingInput'
				label='Email adresi'
				className='mb-3'
			>
				<Form.Control
					required
					onChange={handleRegisterForm}
					name='email'
					type='email'
					placeholder='name@example.com'
				/>
			</FloatingLabel>
			<FloatingLabel
				controlId='floatingInput'
				label='Telefon Numarası'
				className='mb-3'
			>
				<Form.Control
					required
					onChange={handleRegisterForm}
					name='phone'
					type='number'
					placeholder='05055034455'
				/>
			</FloatingLabel>
			{registerForm.userType === 'customer' && (
				<FloatingLabel
					style={{ marginBottom: '1rem' }}
					controlId='floatingTextarea2'
					label='Adres'
				>
					<Form.Control
						required
						onChange={(e) =>
							setRegisterForm((prev) => ({
								...prev,
								[e.target.name]: e.target.value,
							}))
						}
						name='address'
						as='textarea'
						placeholder='Adres'
						style={{ height: '100px' }}
					/>
				</FloatingLabel>
			)}
			<InputGroup className='mb-3'>
				<InputGroup.Text>
					<MdOutlineVpnKey />
				</InputGroup.Text>
				<FloatingLabel label='Şifre'>
					<Form.Control
						required
						onChange={handleRegisterForm}
						name='password'
						type='text'
						placeholder='Şifre'
					/>
				</FloatingLabel>
			</InputGroup>
			<Form.Group className='mb-3'>
				<Form.Check
					type='checkbox'
					label='Kullanım koşullarını okudum ve kabul ediyorum.'
				/>
			</Form.Group>
			<span style={{ display: 'flex' }}>
				<Button
					style={{ marginInline: 'auto' }}
					onClick={handleFormSubmit}
					variant='outline-primary'
				>
					Kaydol
				</Button>
			</span>
		</Form>
	);
}
export default Register;
