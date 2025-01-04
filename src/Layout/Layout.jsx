import React from 'react';
import Footer from './Footer';
import { Outlet } from 'react-router';
import ToTopArrow from '../components/UI/ToTopArrow';
import CustomNavbar from './CustomNavbar';
import { Provider } from 'react-redux';
import store from '../redux/store';

function Layout() {
	return (
		<Provider store={store}>
			<CustomNavbar />
			<Outlet />
			<Footer />
			<ToTopArrow />
		</Provider>
	);
}
export default Layout;
