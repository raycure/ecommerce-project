import jwt from 'jsonwebtoken';
import { userService } from '../services/index.js';
const updateProduct = async (req, res) => {
	try {
		if (!req.isAuthenticated) {
			return res.status(403);
		}
		const accessToken = req.accessToken;
		const userId = req.userId;
		const decoded = jwt.decode(accessToken, process.env.ACCESS_TOKEN_SECRET);
		const { image, name, description, stock, price, category, brand } =
			req.body.productData;
		const { productId } = req.body;
		let table = 'producttable';
		let identificationData = { table, productId };
		let updateData = {
			image,
			name,
			description,
			category,
			brand,
		};

		await userService.updateData(identificationData, updateData);

		table = 'seller_producttable';
		updateData = { stock, price };
		identificationData = { table, productId };

		await userService.updateData(identificationData, updateData);
		return res.status(200).json({
			success: true,
			message: 'products updated successfully',
			accessToken,
		});
	} catch (error) {
		console.error('Error in updateUserController:', error);
		return res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

export default updateProduct;
