import { userService } from '../services/index.js';

const purchase = async (req, res) => {
	try {
		console.log('req.isAuthenticated', req.isAuthenticated);
		if (!req.isAuthenticated) {
			return res.status(403);
		}
		console.log('req.body', req.body);
		const { sellerId, seller_productId } = req.body.orderData[0];
		const customerId = req.userId;
		let table = 'seller_producttable';
		let totalPrice = 0;
		const boughtProducts = await Promise.all(
			req.body.orderData.map(async (orderItem) => {
				const { amount, seller_productId } = orderItem;
				const findProduct = { table, seller_productId };
				const boughtProduct = await userService.findData(findProduct);
				totalPrice = totalPrice + boughtProduct.price * amount;
				return { ...boughtProduct, amount };
			})
		);

		const orderInsert = {
			table: 'ordertable',
			customerId: customerId,
			totalPrice,
			methodtype: req.body.selectedMethod,
		};
		const orderInfo = await userService.insertData(orderInsert);
		const orderId = orderInfo.insertId;

		console.log('boughtProducts', boughtProducts);

		await userService.insertOrderItems(boughtProducts, orderId);

		// table = 'paymenttable';
		// const paymentInfo = { selectedMethod: req.body.selectedMethod, table };
		// await userService.insertData(paymentInfo);

		return res.status(200).json({
			success: true,
			message: 'order has been added successfully',
			accessToken: req.accessToken,
		});
	} catch (error) {
		console.error('Error in updateUserController:', error);
		return res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

export default purchase;

// boughtProducts.map(async (item) => {
// 	const { price, amount, sellerId, productId, seller_productId } = item;
// 	const orderInsert = {
// 		table: 'orderitemtable',
// 		price,
// 		amount,
// 		sellerId,
// 		orderId,
// 		productId,
// 		seller_productId,
// 	};
// 	await userService.insertData(orderInsert);
// });
