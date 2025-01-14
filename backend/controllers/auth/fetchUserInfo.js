import { userService } from '../../services/index.js';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const fetchUserInfo = async (req, res) => {
	try {
		const accessToken = req.accessToken;
		const decoded = jwt.decode(accessToken, process.env.ACCESS_TOKEN_SECRET);
		const { phone, email, userType } = decoded;
		// console.log('decoded', decoded);

		const table = await userService.getTheTableNameByUserType(userType);
		// console.log('table', table);
		const userIdentifaction = { phone, email, table };

		const response = await userService.findData(userIdentifaction);

		return res.status(200).json({
			response,
		});
	} catch (error) {
		console.error('Error in testController:', error);
		return res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const updateUserController = async (req, res) => {
	try {
		const accessToken = req.accessToken;
		const userId = req.userId;
		const decoded = jwt.decode(accessToken, process.env.ACCESS_TOKEN_SECRET);
		const { phone: oldPhone, email: oldEmail, userType } = decoded;
		console.log('req.body,', req.body);

		const table = await userService.getTheTableNameByUserType(userType);
		const identificationData = { email: oldEmail, phone: oldPhone, table };
		console.log('identificationData', identificationData);
		const { name, surname, address, phone, email, image } = req.body;
		console.log('req.body ', req.body);

		const updateData = {
			name,
			surname,
			...(address ? { address } : {}),
			email,
			phone,
			image,
		};

		const updatedUser = await userService.updateData(
			identificationData,
			updateData
		);

		if (!updatedUser) {
			return res.status(400).json({
				success: false,
				message: 'Update failed',
			});
		}

		const newAccessToken = jwt.sign(
			{
				userId,
				email,
				userType,
				phone,
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '15m' }
		);

		res.header('x-refreshed-token', 'true');

		// Return the updated user data
		return res.status(200).json({
			success: true,
			message: 'User updated successfully',
			accessToken: newAccessToken,
			data: updatedUser,
		});
	} catch (error) {
		console.error('Error in updateUserController:', error);
		return res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

export { updateUserController, fetchUserInfo };
