import * as dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

const fetcherBasedOnUserType = async (req, res, next) => {
	try {
		if (!req.isAuthenticated) {
			return next();
		}
		const accessToken = req.accessToken;
		const decoded = jwt.decode(accessToken, process.env.ACCESS_TOKEN_SECRET);
		const userType = decoded.userType;
		if (req.query.sellerId) {
			const fetchSellerProducts = (
				await import('../controllers/fetchSellerProducts.js')
			).default;
			console.log('req.query.sellerId triggered');
			return fetchSellerProducts(req, res);
		}
		if (userType === 'seller') {
			const fetchSellerProducts = (
				await import('../controllers/fetchSellerProducts.js')
			).default;
			console.log('userType === seller triggered');

			return fetchSellerProducts(req, res);
		}
		if (userType === 'admin') {
			const fetchAdminAssignedProducts = (
				await import('../controllers/fetchAdminAssignedProducts.js')
			).default;
			console.log('userType === admin triggered');
			return fetchAdminAssignedProducts(req, res);
		}
		return next();
	} catch (error) {
		console.error('Fetcher middleware error:', error);
		return res.status(500).json({ error: 'Failed to fetch data' });
	}
};

export default fetcherBasedOnUserType;
