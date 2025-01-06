import verifyJWT from '../controllers/auth/verifyJwt.js';
import refreshJwt from '../controllers/auth/refreshJwt.js';
import jwt from 'jsonwebtoken';
// import logout from '../controllers/auth/logout.js';
import * as dotenv from 'dotenv';
dotenv.config();

import { userService } from '../services/index.js';
const authFlow = async (req, res, next) => {
	try {
		console.log('auth flow reached');
		const refreshToken = req.cookies.jwt;
		if (!refreshToken) {
			console.log('no refresh token');
			return res.status(401).json({ message: 'gecersiz yetkinlikte istek' });
		}

		let decodedToken;
		try {
			decodedToken = jwt.decode(refreshToken);
			jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
		} catch (decodeError) {
			console.log('refreshToken verification failed');
			return res.status(403).json({
				message: 'oturumunuz bulunamamistir',
			});
		}

		const userId = decodedToken.userId;
		const userType = decodedToken.userType;
		const table = await userService.getTheTableNameByUserType(userType);
		const idColumnName = `${userType}Id`;
		const userIdentifiers = { table, [idColumnName]: userId };

		const foundUser = await userService.findUser(userIdentifiers);

		if (!foundUser) {
			console.log('no user found');
			return res.status(404).json({
				message: 'bu bilgilerle eslesen kullanici bulunamadi',
			});
		}

		const verifyJwtMockResponse = {
			status: function (code) {
				this.statusCode = code;
				return this;
			},
			json: function (data) {
				this.responseData = data;
				return this;
			},
		};

		// Call verifyJWT with req and mock response
		const authHeader = req.headers['authorization'];
		// if (!authHeader) {
		// 	console.log('no auth header');
		// 	return res.status(401).json({ message: 'access token saglanmamis' });
		// }
		const accessToken = authHeader?.split(' ')[1];
		req.accessToken = accessToken;

		console.log('gonna verify');
		await verifyJWT(req, verifyJwtMockResponse);
		if (verifyJwtMockResponse.statusCode === 200) {
			req.userId = userId;
			req.isAuthenticated = true; // Mark user as authenticated
			console.log('access token verified');
			return next();
		}

		const refreshMockRes = {
			status: function (code) {
				this.statusCode = code;
				return this;
			},
			json: function (data) {
				this.responseData = data;
				return this;
			},
		};

		console.log('gonna refresh');
		await refreshJwt(req, refreshMockRes);
		if (refreshMockRes.statusCode === 200) {
			res.header('x-refreshed-token', 'true');
			req.isAuthenticated = true;
			console.log('refresh successful');

			req.accessToken = refreshMockRes.responseData.newAccessToken;
			req.userId = userId;
			return next();
		}

		if (refreshMockRes.statusCode === 403) {
			const errorMsg = refreshMockRes.responseData.message;
			// return res.status(403).json({ message: res.__(`${errorMsg}`) });
		}

		req.isAuthenticated = false;
		req.accessToken = null;
		req.userId = null;
		return next();
	} catch (error) {
		console.log('error in authMiddleware', error);

		// return res.status(500).json({ message: res.__('serverError') });
	}
};

export default authFlow;
