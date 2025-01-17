import pkg from 'bcryptjs';
const { hash, compare } = pkg;
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();
import { userService } from '../../services/index.js';

const register = async (req, res) => {
	try {
		const { name, surname, email, phone, password, address, userType } =
			req.body;
		const table = await userService.getTheTableNameByUserType(userType);
		const userIdentifaction = { phone, email, table };
		const existingUser = await userService.findData(userIdentifaction);
		if (existingUser) {
			return res.status(409).json({
				message:
					'bu telefon numarasi veya mail baska bir hesap tarafindan coktan kullanilmis',
			});
		}
		const hashedPassword = await hash(password, 5);
		const newUserData = {
			phone,
			email,
			password: hashedPassword,
			name,
			surname,
			...(address ? { address } : {}),
			table,
		};
		console.log('newuserdata', newUserData);
		const newUser = await userService.insertData(newUserData);
		const userId = newUser.insertId;

		const accessToken = jwt.sign(
			{
				userType,
				userId,
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
				userType,
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

		res.status(200).json({
			accessToken: accessToken,
			userType,
			message: 'basariyla kayit oldunuz',
		});
	} catch (error) {
		res.status(500).json({ message: 'bir hata olustu' });
		console.log('error in register', error);
	}
};

export default register;
