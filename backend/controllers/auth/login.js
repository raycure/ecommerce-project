import pkg from 'bcryptjs';
const { hash, compare } = pkg;
import jwt from 'jsonwebtoken';
import { userService } from '../../services/index.js';
import * as dotenv from 'dotenv';
dotenv.config();

const login = async (req, res) => {
	try {
		const { email, phone, password } = req.body;

		let table = 'customertable';
		let userIdentifaction = { phone, email, table };
		let existingUser = await userService.findUser(userIdentifaction);
		let idType = 'customer';

		if (!existingUser) {
			table = 'sellertable';
			userIdentifaction = { phone, email, table };
			existingUser = await userService.findUser(userIdentifaction);
			idType = 'seller';
		}
		// todo uncomment it
		// const isMatch = await pkg.compare(password, existingUser.password);
		// if (!isMatch) {
		// 	return res.status(403).json({
		// 		success: false,
		// 		result: null,
		// 		message: 'bilgileriniz yanlis',
		// 	});
		// }
		const idName = `${idType}Id`;
		const userId = existingUser[idName];
		const accessToken = jwt.sign(
			{
				userId,
				userType: idType,
				email,
				phone,
			},
			process.env.ACCESS_TOKEN_SECRET,
			{ expiresIn: '15m' }
		);
		const refreshToken = jwt.sign(
			{
				userId,
				email,
				userType: idType,
				phone,
			},
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: '365d' }
		);
		res.cookie('jwt', refreshToken, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 30,
			sameSite: 'Lax',
			path: '/',
			secure: false,
		});

		return res.status(200).json({
			accessToken: accessToken,
			userType: idType,
			message: 'basarili bir sekilde giris yaptiniz',
		});
	} catch (error) {
		console.log('error', error);
		return res.status(500).json({
			success: false,
			result: null,
			error: error,
			message: 'bir hata olustu',
		});
	}
};

export default login;
