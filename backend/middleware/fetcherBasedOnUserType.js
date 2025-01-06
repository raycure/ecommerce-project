import * as dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

const fetcherBasedOnUserType = async (req, res, next) => {
	try {
		const accessToken = req.accessToken;
		const decoded = jwt.decode(accessToken, process.env.ACCESS_TOKEN_SECRET);
		const userType = decoded.userType;

		if (userType === 'customer') {
			const testController = (await import('../controllers/testController.js'))
				.default;
			return testController(req, res);
		} else {
			console.log('usertype is ', userType);
			const fetchSellerProducts = (
				await import('../controllers/fetchSellerProducts.js')
			).default;
			return fetchSellerProducts(req, res);
		}
		// todo add api call for admin
		return next();
	} catch (error) {
		console.error('Fetcher middleware error:', error);
		return res.status(500).json({ error: 'Failed to fetch data' });
	}
};

export default fetcherBasedOnUserType;
