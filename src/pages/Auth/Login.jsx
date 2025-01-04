import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { MdOutlineVpnKey } from 'react-icons/md';
import { FaUserLock } from 'react-icons/fa';
import './Auth.css';
import { useDispatch } from 'react-redux';
import { requestService } from '../../redux/requestService';
function Login() {
	const dispatch = useDispatch();
	const [loginForm, setLoginForm] = useState({
		email: '',
		phone: '',
		password: '',
	});
	const handleLoginForm = (e) => {
		setLoginForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	async function handleFormSubmit() {
		const response = await dispatch(
			requestService({
				data: loginForm,
				endpoint: 'user/login',
				method: 'POST',
			})
		);
		console.log('response in register', response);
	}
	return (
		<Form className='authentication-form login-form'>
			<span style={{ display: 'flex' }}>
				<FaUserLock style={{ fontSize: '6rem', margin: '0 auto 1.5rem' }} />
			</span>
			<FloatingLabel
				controlId='floatingInput'
				label='Email adresi'
				className='mb-3'
			>
				<Form.Control
					required
					onChange={handleLoginForm}
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
					onChange={handleLoginForm}
					name='phone'
					type='number'
					placeholder='05055034455'
				/>
			</FloatingLabel>
			<InputGroup className='mb-3'>
				<InputGroup.Text id='basic-addon1'>
					<MdOutlineVpnKey />
				</InputGroup.Text>
				<FloatingLabel controlId='floatingInput' label='Şifre'>
					<Form.Control
						required
						onChange={handleLoginForm}
						name='password'
						type='text'
						placeholder='Şifre'
					/>
				</FloatingLabel>
			</InputGroup>
			<span style={{ display: 'flex' }}>
				<Button
					style={{ marginInline: 'auto' }}
					onClick={handleFormSubmit}
					variant='outline-primary'
				>
					Giriş Yap
				</Button>
			</span>
		</Form>
	);
}
export default Login;
