import { pool } from '../config/db.js';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const fetchSellerProducts = async (req, res) => {
	try {
		// console.log({
		// 	isAuthenticated: req.isAuthenticated,
		// 	accessToken: req.accessToken,
		// 	userId: req.userId,
		// 	body: req.body,
		// });

		// console.log('fetchSellerProducts reached');

		const accessToken = req.accessToken;
		const decoded = jwt.decode(accessToken, process.env.ACCESS_TOKEN_SECRET);
		// console.log('decoded', decoded);
		const { phone, email, userType, userId: sellerId } = decoded;

		const test = { sellerId };
		const fields = Object.keys(test);
		const values = Object.values(test);
		// console.log('fields', fields, 'values', values);

		const query = `SELECT subq.*,
        c.categoryName,
        b.brandName
            FROM (
    SELECT
        sp.stock,
        sp.price,
        p.name as prodName,
        p.description as product_description,
        p.category,
        p.brand,
        p.image,
		s.banned,
        s.name as sellerName,
        s.surname as sellerSurname,
        s.verified
    FROM seller_producttable sp
    JOIN sellertable s ON sp.sellerId = s.sellerId
    JOIN producttable p ON sp.productId = p.productId
    WHERE sp.sellerId = ?
) as subq
JOIN categorytable c ON subq.category = c.categoryId
JOIN brandtable b ON subq.brand = b.brandId`;
		const [rows] = await pool.query(query, [sellerId]);
		console.log('rows ', rows);
		const mappedResults = rows.map((item) => {
			const {
				stock,
				price,
				verified,
				sellerName,
				sellerSurname,
				categoryName,
				brandName,
				prodName,
				image,
				banned,
			} = item; // Changed from rows to item

			return {
				stock,
				price,
				sellerVerified: verified,
				seller: sellerName + ' ' + sellerSurname,
				sellerSurname,
				categoryName,
				isSellerBanned: banned,
				brand: brandName,
				title: prodName,
				image,
				// You can add any transformations or additional fields here
			};
		});

		// console.log('mappedResults', mappedResults);

		return res.status(200).json({
			mappedResults,
			accessToken: req.accessToken,
		});
	} catch (error) {
		// console.error('Error in testController:', error);
		return res.status(500).json({
			success: false,
			message: 'Internal server error',
			error: process.env.NODE_ENV === 'development' ? error.message : undefined,
		});
	}
};

export default fetchSellerProducts;
