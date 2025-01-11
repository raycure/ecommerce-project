import { pool } from '../config/db.js';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();
import { userService } from '../services/index.js';

const fetchSellers = async (req, res) => {
	try {
		const accessToken = req.accessToken;
		const decoded = jwt.decode(accessToken, process.env.ACCESS_TOKEN_SECRET);
		const { userId: adminId } = decoded;

		let tables = [
			{ name: 'admintable', alias: 'a' },
			{ name: 'admin_categorytable', alias: 'ac' },
			{ name: 'categorytable', alias: 'c' },
			{ name: 'producttable', alias: 'p' },
		];
		let joinConditions = {
			admin_categorytable: 'a.adminId = ac.adminId',
			categorytable: 'ac.category = c.categoryId',
			producttable: 'p.category = c.categoryId',
		};
		let selectColumns = [
			'ac.category, a.phone, a.email, p.image, p.brand, p.name, p.productId',
		];
		let whereConditions = ['a.adminId'];

		const result = await userService.buildSubquery(
			'',
			tables,
			selectColumns,
			whereConditions,
			joinConditions
		);

		tables = [
			{ name: 'brandtable', alias: 'b' },
			{ name: 'seller_producttable', alias: 'sp' },
			{ name: 'sellertable', alias: 's' },
		];
		joinConditions = {
			seller_producttable: 'sp.productId = subq.productId',
			brandtable: 'b.brandId = subq.brand',
			sellertable: 's.sellerId = sp.sellerId',
		};
		selectColumns = [
			'subq.*, b.name as brandName, sp.price, s.name as sellerName, s.surname as sellerSurname, s.sellerId',
		];

		const finalQuery = await userService.buildFullQuery(
			tables,
			selectColumns,
			joinConditions,
			{},
			result
		);

		console.log('finalQuery', finalQuery);

		const [rows] = await pool.query(finalQuery, [adminId]);
		console.log('rows', rows);

		const mappedResults = rows.map((item) => {
			const {
				name: title,
				price,
				sellerName,
				sellerSurname,
				productId,
				category,
				description,
				sellerId,
				image,
				brandName: brand,
			} = item;
			return {
				description,
				image,
				brand,
				sellerId,
				productId,
				sellerFullName: sellerName + ' ' + sellerSurname,
				price,
				category,
				title,
			};
		});
		return res.status(200).json({
			mappedResults,
			accessToken: req.accessToken,
		});
	} catch (error) {
		console.log('error in fetchSellers', error);
		return res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

export default fetchSellers;
