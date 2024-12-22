import React from 'react';
import { Button, Container, Form, Nav, NavDropdown } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { FaUser } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';
function CustomNavbar() {
	const loggedIn = false;
	const user = 'shopper';
	return (
		<Navbar sticky='top' bg='dark' data-bs-theme='dark'>
			<Container>
				<Navbar.Brand href='/'>
					<img
						src=''
						width='30'
						height='30'
						className='d-inline-block align-top'
						alt='logo'
					/>
				</Navbar.Brand>
				<Nav className='me-auto'>
					<Nav.Link href='/'>Ana Sayfa</Nav.Link>
					{user === 'seller' && <Nav.Link href='/shop'>Dükkanım</Nav.Link>}
					{user !== 'admin' && <Nav.Link href='/contact'>Bize Ulaşın</Nav.Link>}
					{user === 'admin' && (
						<Nav.Link href='/admin-controls'>Kontrol Sayfası</Nav.Link>
					)}
					<Nav.Link>test</Nav.Link>
				</Nav>
				<Form className='d-flex'>
					<Form.Control
						type='search'
						placeholder='Ara'
						className='me-2'
						aria-label='Search'
						style={{ borderRadius: '2rem', width: '20rem' }}
					/>
					<Button
						variant='outline-light'
						style={{
							borderColor: 'transparent',
							borderRadius: '1.5rem',
							marginRight: '1rem',
						}}
					>
						<FaMagnifyingGlass />
					</Button>
				</Form>
				<Nav>
					<NavDropdown title={<FaUser />} id='navbarScrollingDropdown'>
						{loggedIn ? (
							<NavDropdown.Item href='/account'>Hesabım</NavDropdown.Item>
						) : (
							<>
								<NavDropdown.Item href='/login'>Giriş Yap</NavDropdown.Item>
								<NavDropdown.Item href='/register'>Kaydol</NavDropdown.Item>
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
