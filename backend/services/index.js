import { pool } from '../config/db.js';
import { UserService } from './userService.js';

const userService = new UserService(pool);

export { userService };
