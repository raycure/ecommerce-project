import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './Layout/Layout';
import Main from './pages/General/Main';
import Error from './pages/General/ErrorPage';
import AdminControls from './pages/Users/Admin/AdminControls';
import ItemInfo from './pages/General/ItemInfo';
import Contact from './pages/General/Contact';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Shop from './pages/Users/Seller/Shop';
import AddItem from './pages/Users/Seller/AddItem';
import AccountInfo from './pages/Users/Shopper/AccountInfo';
import Cart from './pages/Users/Shopper/Cart';
import Purchase from './pages/Users/Shopper/Purchase';
import { Provider } from 'react-redux';
import store from './redux/store.js';

function App() {
	return (
		<>
			<Provider store={store}>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Layout />}>
							<Route index element={<Main />} />
							<Route path='admin-controls' element={<AdminControls />} />
							<Route path='item-info' element={<ItemInfo />} />
							<Route path='login' element={<Login />} />
							<Route path='register' element={<Register />} />
							<Route path='shop' element={<Shop />} />
							<Route path='add-product' element={<AddItem />} />
							<Route path='account' element={<AccountInfo />} />
							<Route path='purchase' element={<Purchase />} />
							<Route path='cart' element={<Cart />} />
							<Route path='contact' element={<Contact />} />
						</Route>
						<Route path='/*' element={<Error />} />
					</Routes>
				</BrowserRouter>
			</Provider>
		</>
	);
}

export default App;
