import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { userService } from '../../services/index.js';
dotenv.config();

const refreshJwt = async (req, res) => {
	try {
		const cookies = req.cookies;
		const refreshToken = cookies.jwt;
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		const decodedToken = jwt.decode(refreshToken);
		const { userId, email, userType, phone } = decodedToken;
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
		res.status(200).json({
			newAccessToken,
		});
	} catch (error) {
		console.log('error in refresh', error);
		res.status(403).json({
			message: 'invalid refesh token ',
		});
	}
};
export default refreshJwt;
