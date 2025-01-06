import { userService } from '../services/index.js';
import { pool } from '../config/db.js';

const testController = async (req, res) => {
	try {
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
				s.name as sellerName,
				s.surname as sellerSurname,
				s.verified
		    FROM seller_producttable sp
		    JOIN sellertable s ON sp.sellerId = s.sellerId
		    JOIN producttable p ON sp.productId = p.productId
		) as subq
		JOIN categorytable c ON subq.category = c.categoryId
		JOIN brandtable b ON subq.brand = b.brandId`;

		const [rows] = await pool.query(query);
		// console.log('rows ', rows);

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
			} = item; // Changed from rows to item

			return {
				stock,
				price,
				sellerVerified: verified,
				seller: sellerName + ' ' + sellerSurname,
				sellerSurname,
				categoryName,
				brand: brandName,
				title: prodName,
				image,
				// You can add any transformations or additional fields here
			};
		});
		return res.status(200).json({
			mappedResults,
			accessToken: req.accessToken,
		});
	} catch (error) {
		console.error('Error in testController:', error);
		return res.status(500).json({
			success: false,
			message: 'Internal server error',
			error: process.env.NODE_ENV === 'development' ? error.message : undefined,
		});
	}
};

export default testController;
