import React from 'react';
import Footer from './Footer';
import { Outlet } from 'react-router';
import ToTopArrow from '../components/UI/ToTopArrow';
import CustomNavbar from './CustomNavbar';

function Layout() {
	return (
		<>
			<CustomNavbar />
			<Outlet />
			<Footer />
			<ToTopArrow />
		</>
	);
}
export default Layout;
