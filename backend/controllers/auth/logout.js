import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const logout = async (req, res) => {
	const cookies = req.cookies;
	const refreshToken = cookies.jwt;

	if (!refreshToken) {
		return res.json({ message: 'logged out successfully' });
	}

	let decodedToken;
	try {
		decodedToken = jwt.decode(refreshToken);
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
	} catch (error) {
		res.clearCookie('jwt', {
			httpOnly: true,
			sameSite: 'Lax',
			path: '/',
			secure: false,
		});
		return res.status(403).json({
			message: 'oturum suresi asilmistir',
		});
	}

	res.clearCookie('jwt', {
		httpOnly: true,
		sameSite: 'Lax',
		path: '/',
		secure: false,
	});

	res.status(200).json({ message: 'basariyla oturum sonlandirilmistir' });
};

export default logout;
// todo might need to reset usertpye in userinfoSlice
