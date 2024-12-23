import React from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
function CategoriesBar({ selectedCategory, setSelectedCategory }) {
	const categories = [
		'Elektronik',
		'Moda',
		'Yiyecek ve İçecek',
		'Kitap',
		'Beyaz Eşya',
		'Ofis Malzemeleri',
		'Spor Ekipmanları',
		'Kırtasiye',
		'Bebek Ürünleri',
		'Ev Dekorasyonu',
		'Aksesuarlar',
		'Müzik Aletleri',
		'Farmaşötik Ürünler',
		'Kozmetik Ürünler',
		'Ayakkabı',
	];

	return (
		<Nav
			className='justify-content-center'
			style={{ position: 'sticky', zIndex: '100' }}
		>
			<Nav.Item>
				<Nav.Link
					active={'Elektronik' === selectedCategory}
					onClick={() => setSelectedCategory('Elektronik')}
					eventKey='Elektronik'
				>
					Elektronik
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link
					active={'Moda' === selectedCategory}
					onClick={() => setSelectedCategory('Moda')}
					eventKey='Moda'
				>
					Moda
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link
					active={'Bebek Ürünleri' === selectedCategory}
					onClick={() => setSelectedCategory('Bebek Ürünleri')}
					eventKey='Bebek Ürünleri'
				>
					Bebek Ürünleri
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link
					active={'Kozmetik Ürünler' === selectedCategory}
					onClick={() => setSelectedCategory('Kozmetik Ürünler')}
					eventKey='Kozmetik Ürünler'
				>
					Kozmetik Ürünler
				</Nav.Link>
			</Nav.Item>
			<NavDropdown title='Tüm Kategoriler' id='nav-dropdown'>
				<NavDropdown.Item
					active={selectedCategory === null || undefined}
					eventKey='all'
					onClick={() => setSelectedCategory(null)}
				>
					Tüm Ürünler
				</NavDropdown.Item>
				{categories.map((category) => (
					<NavDropdown.Item
						active={category === selectedCategory}
						eventKey={category}
						onClick={() => setSelectedCategory(category)}
					>
						{category}
					</NavDropdown.Item>
				))}
			</NavDropdown>
		</Nav>
	);
}
export default CategoriesBar;
