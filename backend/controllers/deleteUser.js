import { userService } from '../services/index.js';

const deleteUser = async (req, res) => {
	try {
		const table = await userService.getTheTableNameByUserType(userType);
		console.log('table', table);

		// let { userId } = req.body;
		// console.log('userId', userId);
		// let identificationData = { table: 'producttable', productId };
		// await userService.deleteData(identificationData);

		// const accessToken = req.accessToken;
		return res.status(200).json({
			success: true,
			message: 'products deleted successfully',
		});
	} catch (error) {
		console.error('Error in updateUserController:', error);
		return res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

export default deleteUser;
