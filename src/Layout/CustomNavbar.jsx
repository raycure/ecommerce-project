import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import { FaUser } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
	setUserType,
	setUserId,
	resetUserInfo,
	selectUserType,
} from '../redux/Slices/UserInfoSlice';
import SearchBar from '../components/UI/SearchBar';
import { requestService } from '../redux/requestService';
import { selectIsLoggedIn } from '../redux/requestSlice';
function CustomNavbar() {
	const dispatch = useDispatch();
	const handleLogin = () => {
		dispatch(setUserType('admin'));
		dispatch(setUserId(123));
	};
	let isLoggedIn = useSelector(selectIsLoggedIn);
	console.log('isLoggedIn', isLoggedIn);

	const userType = useSelector(selectUserType);
	const handleLogout = () => {
		dispatch(requestService({ endpoint: '/user/logout', method: 'POST' }));
	};
	return (
		<Navbar sticky='top' bg='light' data-bs-theme='light'>
			<Container>
				<Navbar.Brand href='/'>
					<img
						src='/ecommerceLogo.png'
						width='100'
						height='45'
						className='d-inline-block align-top'
						alt='logo'
					/>
				</Navbar.Brand>
				<Nav className='me-auto'>
					<Nav.Link href='/'>Ana Sayfa</Nav.Link>
					{userType === 'seller' && <Nav.Link href='/shop'>Dükkanım</Nav.Link>}
					{userType !== 'admin' && (
						<Nav.Link href='/contact'>Bize Ulaşın</Nav.Link>
					)}
					{userType === 'admin' && (
						<Nav.Link href='/admin-controls'>Kontrol Sayfası</Nav.Link>
					)}
				</Nav>
				<SearchBar />
				<Nav>
					<NavDropdown title={<FaUser />} id='navbarScrollingDropdown'>
						{isLoggedIn ? (
							<>
								<NavDropdown.Item href='/account'>Hesabım</NavDropdown.Item>
								<NavDropdown.Item onClick={handleLogout}>
									Çıkış Yap
								</NavDropdown.Item>
							</>
						) : (
							<>
								<NavDropdown.Item href='/login'>Giriş Yap</NavDropdown.Item>
								<NavDropdown.Item href='/register'>Kaydol</NavDropdown.Item>
								<NavDropdown.Item href='/siparislerim'>
									siparislerim
								</NavDropdown.Item>
							</>
						)}
					</NavDropdown>
					<Nav.Link href='/cart'>
						<FaShoppingCart />
					</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	);
}
export default CustomNavbar;
