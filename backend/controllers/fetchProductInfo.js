import { pool } from '../config/db.js';
import { userService } from '../services/index.js';
import * as dotenv from 'dotenv';
dotenv.config();

const fetchProductInfo = async (req, res) => {
	try {
		const { productId, sellerId } = req.query;

		console.log('productId', productId);
		console.log('sellerId', sellerId);

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
			'p.name as prodName',
			'p.description',
			'p.category',
			'p.brand',
			'p.image',
			'p.productId',
			's.name as sellerName',
			's.surname as sellerSurname',
			's.verified',
			's.sellerId',
			'seller_productId',
		];
		let whereConditions = ['sp.sellerId', 'sp.productId'];

		const result = await userService.buildSubquery(
			'',
			tables,
			selectColumns,
			whereConditions,
			joinConditions
		);
		console.log('result', result);

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
		const [rows] = await pool.query(finalQuery, [sellerId, productId]);
		console.log('rows', rows);

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
				brand,
				category,
				image,
				productId,
				description,
				sellerId,
				seller_productId,
			} = item;

			return {
				stock,
				price,
				sellerVerified: verified,
				seller: sellerName + ' ' + sellerSurname,
				sellerSurname,
				categoryName,
				sellerId,
				brand: brandName,
				seller_productId,
				brandIndex: brand,
				categoryIndex: category,
				title: prodName,
				productId,
				image,
				description,
			};
		});

		console.log('mappedResults', mappedResults);

		return res.status(200).json({
			mappedResults,
			accessToken: req.accessToken,
		});
	} catch (error) {
		console.error('Error in testController:', error);
		return res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

export default fetchProductInfo;
