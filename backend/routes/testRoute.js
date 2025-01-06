import express from 'express';
import testController from '../controllers/testController.js';
import {
	testUserController,
	updateUserController,
} from '../controllers/auth/testUserInfo.js';
import authFlow from '../middleware/authFlow.js';
import fetchSellerProducts from '../controllers/fetchSellerProducts.js';
import fetcherBasedOnUserType from '../middleware/fetcherBasedOnUserType.js';
const router = express.Router();

// router.post('/test', authFlow, testController);
router.get('/test', authFlow, fetcherBasedOnUserType, testController);
router.get('/testUserInfo', authFlow, testUserController);
router.patch('/patchUserInfo', authFlow, updateUserController);
router.get('/sellersProducts', authFlow, fetchSellerProducts);
// router.get('/sellersProducts', fetchSellerProducts);
export default router;
