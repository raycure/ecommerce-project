import { pool } from '../config/db.js';
import { userService } from '../services/index.js';

const fetchProducts = async (req, res) => {
	try {
		console.log('reachedHERE');

		let tables = [
			{ name: 'seller_producttable', alias: 'sp' },
			{ name: 'sellertable', alias: 's' },
			{ name: 'producttable', alias: 'p' },
		];
		let joinConditions = {
			sellertable: 's.sellerId = sp.sellerId',
			producttable: 'sp.productId = p.productId',
		};
		let selectColumns = [
			'sp.stock',
			'sp.price',
			's.sellerId',
			'p.name as prodName',
			'p.description',
			'p.category',
			'p.brand',
			'p.image',
			'p.productId',
			's.name as sellerName',
			's.surname as sellerSurname',
			's.verified',
		];

		let whereConditions = ['s.banned'];
		const result = await userService.buildSubquery(
			'',
			tables,
			selectColumns,
			whereConditions,
			joinConditions
		);
		tables = [
			{ name: 'categorytable', alias: 'c' },
			{ name: 'brandtable', alias: 'b' },
		];
		joinConditions = {
			categorytable: 'subq.category = c.categoryId',
			brandtable: 'b.brandId = subq.brand',
		};
		selectColumns = ['c.name as categoryName', 'b.name as brandName'];

		const finalQuery = await userService.buildFullQuery(
			tables,
			selectColumns,
			joinConditions,
			{},
			result
		);
		console.log('finalQuery', finalQuery);

		const [rows] = await pool.query(finalQuery, [0]);
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
				productId,
				sellerId,
			} = item; // Changed from rows to item

			return {
				stock,
				price,
				sellerVerified: verified,
				sellerId,
				sellerFullName: sellerName + ' ' + sellerSurname,
				categoryName,
				brand: brandName,
				title: prodName,
				productId,
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

export default fetchProducts;
