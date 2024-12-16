import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router';
import ToTopArrow from '../components/UI/ToTopArrow';

function Layout() {
	return (
		<>
			<Navbar />
			<Outlet />
			<Footer />
			<ToTopArrow />
		</>
	);
}
export default Layout;
