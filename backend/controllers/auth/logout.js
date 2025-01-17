import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const logout = async (req, res) => {
	const cookies = req.cookies;
	const refreshToken = cookies.jwt;

	if (!refreshToken) {
		return res.json({ message: 'basariyla oturum sonlandirilmistir' });
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
