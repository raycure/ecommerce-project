import pkg from 'bcryptjs';
const { hash, compare } = pkg;
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();
import { userService } from '../../services/index.js';

const login = async (req, res) => {
	try {
		console.log('req.body', req.body);
		const { email, phone, password } = req.body;

		// const isMatch = await pkg.compare(password, user.password);
		if (!isMatch) {
			return res.status(403).json({
				success: false,
				result: null,
				message: 'bilgileriniz yanlis',
			});
		}

		const accessToken = jwt.sign(
			{
				userId,
				userType,
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

		return res.status(200).json({
			accessToken: accessToken,
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
