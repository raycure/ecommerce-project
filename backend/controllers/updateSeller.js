import { userService } from '../services/index.js';
const updateSeller = async (req, res) => {
	try {
		console.log('req.userType', req.userType);
		console.log('req.isAuthenticated', req.isAuthenticated);

		if (!req.isAuthenticated || req.userType !== 'admin') {
			console.log('not authed or not a admin or a seller');
			return res.status(403);
		}

		let { sellerId } = req.body;
		let table = 'sellertable';
		const { updateType } = req.body;
		const updateData = { [updateType]: 1 };
		const identificationData = { sellerId, table };
		await userService.updateData(identificationData, updateData);

		return res.status(200).json({
			success: true,
			message: 'user updated successfully',
			accessToken: req.accessToken,
		});
	} catch (error) {
		console.error('Error in updateUserController:', error);
		return res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

export default updateSeller;
