import { userService } from '../services/index.js';

const deleteProduct = async (req, res) => {
	try {
		if (!req.isAuthenticated || req.userType === 'customer') {
			console.log('not authed or not a admin or a seller');
			return res.status(403);
		}

		let { productId } = req.body;
		console.log('productId', productId);
		let identificationData = { table: 'producttable', productId };
		await userService.deleteData(identificationData);

		const accessToken = req.accessToken;
		return res.status(200).json({
			success: true,
			message: 'products deleted successfully',
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

export default deleteProduct;
