import express from 'express';
import fetchProducts from '../controllers/fetchProducts.js';
import {
	fetchUserInfo,
	updateUserController,
} from '../controllers/auth/fetchUserInfo.js';
import authFlow from '../middleware/authFlow.js';
import fetchSellerProducts from '../controllers/fetchSellerProducts.js';
import fetcherBasedOnUserType from '../middleware/fetcherBasedOnUserType.js';
import createProduct from '../controllers/createProduct.js';
import updateProduct from '../controllers/updateProduct.js';
import deleteProduct from '../controllers/deleteProduct.js';
import fetchProductInfo from '../controllers/fetchProductInfo.js';
import updateSeller from '../controllers/updateSeller.js';
import purchase from '../controllers/purchase.js';
import fetchOrders from '../controllers/fetchOrders.js';
const router = express.Router();

router.get(
	'/getProductsBasedOnUser',
	authFlow,
	fetcherBasedOnUserType,
	fetchProducts
);
router.get('/fetchProductInfo', authFlow, fetchProductInfo);
router.post('/updateSeller', authFlow, updateSeller);
router.get('/fetchUserInfo', authFlow, fetchUserInfo);
router.patch('/patchUserInfo', authFlow, updateUserController);
router.patch('/updateProduct', authFlow, updateProduct);
router.get('/sellersProducts', authFlow, fetchSellerProducts);
router.post('/createProduct', authFlow, createProduct);
router.post('/deleteProduct', authFlow, deleteProduct);
router.post('/purchase', authFlow, purchase);
router.get('/fetchOrders', authFlow, fetchOrders);
export default router;
