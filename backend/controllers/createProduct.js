import { userService } from '../services/index.js';
const createProduct = async (req, res) => {
	if (!req.isAuthenticated) {
		return res.status(403).json({ message: 'seller kullanici gerekli' });
	}
	const accessToken = req.accessToken;
	const { name, brand, category, image, description, price, stock } = req.body;
	let table = 'producttable';
	const insertData = {
		table,
		name,
		brand,
		category,
		image,
		description,
	};
	const newProduct = await userService.insertData(insertData);
	const productId = newProduct.insertId;
	const sellerId = req.userId;
	table = 'seller_producttable';
	const assignedData = { table, price, stock, sellerId, productId };
	await userService.insertData(assignedData);
	res.status(200).json({
		accessToken,
	});
};

export default createProduct;
