import express from 'express';
import register from '../controllers/auth/register.js';
import login from '../controllers/auth/login.js';
import logout from '../controllers/auth/logout.js';
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);

export default router;
