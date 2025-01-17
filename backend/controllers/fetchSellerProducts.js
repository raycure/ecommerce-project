import { pool } from '../config/db.js';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();
import { userService } from '../services/index.js';

const fetchSellerProducts = async (req, res) => {
	try {
		const accessToken = req.accessToken;
		const decoded = jwt.decode(accessToken, process.env.ACCESS_TOKEN_SECRET);
		const userId = decoded?.userType === 'seller' ? decoded.userId : null;
		const sellerId = req.query.sellerId || null || userId;
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
			's.banned',
			's.image as sellerImage',
			's.sellerId',
			'p.productId',
			's.name as sellerName',
			's.surname as sellerSurname',
			's.verified',
		];
		let whereConditions = ['sp.sellerId'];

		const result = await userService.buildSubquery(
			'',
			tables,
			selectColumns,
			whereConditions,
			joinConditions
		);
		// console.log('result', result);

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
		// console.log('finalQuery', finalQuery);

		const [rows] = await pool.query(finalQuery, [sellerId]);
		console.log('rows ', rows);
		const mappedResults = rows.map((item) => {
			const {
				stock,
				price,
				sellerImage,
				verified,
				sellerName,
				sellerSurname,
				categoryName,
				brandName,
				prodName,
				banned,
				image,
				productId,
				sellerId,
			} = item;

			return {
				stock,
				price,
				sellerVerified: verified,
				sellerFullName: sellerName + ' ' + sellerSurname,
				sellerImage,
				sellerSurname,
				categoryName,
				isSellerBanned: banned,
				brand: brandName,
				title: prodName,
				productId,
				image,
				sellerId,
			};
		});
		return res.status(200).json({
			mappedResults,
			accessToken: req.accessToken,
		});
	} catch (error) {
		console.log('error', error);

		return res.status(500).json({
			success: false,
			message: 'Internal server error',
			error: process.env.NODE_ENV === 'development' ? error.message : undefined,
		});
	}
};

export default fetchSellerProducts;
