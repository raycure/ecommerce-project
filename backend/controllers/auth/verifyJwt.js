import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const verifyJWT = async (req, res) => {
	const accessToken = req.accessToken;
	console.log('accessToken in verify', accessToken);

	try {
		jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
		res.status(200).json({
			message: 'successful verify jwt',
		});
	} catch (error) {
		console.log('error in verify', error);
		return res.status(403).json({ message: 'Token verification failed' });
	}
};

export default verifyJWT;
