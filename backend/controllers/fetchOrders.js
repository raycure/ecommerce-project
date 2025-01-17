import { userService } from '../services/index.js';
import { pool } from '../config/db.js';

const fetchOrders = async (req, res) => {
	try {
		const id = req.userId;
		const userType = req.userType;
		console.log('userType', userType);

		let query;
		if (userType === 'customer') {
			const customerId = id;
			query = `
		   SELECT p.*, o.methodtype, o.totalPrice, o.orderDate, o.customerId, oi.*
                FROM ordertable o
                JOIN orderitemtable oi ON o.orderId = oi.orderId
                JOIN seller_producttable sp ON sp.seller_productId = oi.seller_productId
                JOIN producttable p ON p.productId = oi.productId
                WHERE o.customerId = ?;
	   `;
		} else {
			const sellerId = id;
			query = `SELECT p.*, o.methodtype, o.totalPrice, o.orderDate, o.customerId, oi.*
			FROM ordertable o
			JOIN orderitemtable oi ON o.orderId = oi.orderId
			JOIN seller_producttable sp ON sp.seller_productId = oi.seller_productId
			JOIN producttable p ON p.productId = oi.productId
			WHERE o.customerId = ?;`;
		}

		const uniqueCustomers = [];
		const [rows] = await pool.query(query, [id]);
		const mappedResults = rows.map((item) => {
			const {
				productId,
				name,
				description,
				category,
				brand,
				image,
				price,
				amount,
				methodType,
				totalPrice,
				customerId,
				orderDate,
			} = item;
			if (userType === 'seller' && !uniqueCustomers.includes(customerId)) {
				uniqueCustomers.push(customerId);
			}

			return {
				brand,
				orderDate,
				customerId,
				amount,
				methodType,
				totalPrice,
				price,
				title: name,
				productId,
				image,
				productId,
				description,
				image,
			};
		});

		let table = 'customertable';
		const customers =
			userType === 'seller'
				? await Promise.all(
						uniqueCustomers.map(async (customerId) => {
							const userData = { table, customerId };
							return await userService.findData(userData);
						})
				  )
				: '';
		console.log('customer', customers);

		return res.status(200).json({
			mappedResults,
			...customers,
			accessToken: req.accessToken,
		});
	} catch (error) {
		console.log('error', error);

		return res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

export default fetchOrders;
