import { userService } from '../services/index.js';
import { pool } from '../config/db.js';

const fetchOrders = async (req, res) => {
	try {
		const id = req.userId;
		const userType = req.userType;
		const idType = [userType] + 'Id';
		const whereByUserType =
			userType === 'customer' ? `o.${idType}= ?` : `oi.${idType}= ?`;

		const query = `
        SELECT p.*, parent.*
        FROM (
            SELECT subq.*
            FROM (
                SELECT oi.*, o.methodtype, o.totalPrice, o.orderDate, o.customerId
                FROM orderitemtable oi
                JOIN ordertable o ON oi.orderId = o.orderId
				WHERE ${whereByUserType}
            ) AS subq
            JOIN seller_producttable sp ON sp.seller_productId = subq.seller_productId
        ) AS parent 
        JOIN producttable p ON parent.productId = p.productId
    `;
		const uniqueCustomers = [];
		const [rows] = await pool.query(query, id);
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
			error: process.env.NODE_ENV === 'development' ? error.message : undefined,
		});
	}
};

export default fetchOrders;
