import { pool } from '../config/db.js';
class UserService {
	constructor(pool) {
		this.pool = pool;
	}

	async findUser(userData) {
		const { table, ...queryFields } = userData;
		try {
			const fields = Object.keys(queryFields);
			const values = Object.values(queryFields);

			const query = `
				SELECT * FROM ${table}
				WHERE ${fields.map((field) => `${field} = ?`).join(' OR ')}
			`;
			console.log('select query:', query);

			const [rows] = await this.pool.query(query, values);
			return rows[0];
		} catch (error) {
			throw error;
		}
	}

	async createUserDynamic(userData) {
		try {
			const { table, ...queryFields } = userData;
			const fields = Object.keys(queryFields);
			const values = Object.values(queryFields);

			const query = `
                        INSERT INTO ${table}
                        (${fields.join(', ')})
                        VALUES
                        (${fields.map(() => '?').join(', ')})
                    `;

			console.log('insert query:', query);

			const [result] = await this.pool.query(query, values);
			return result;
		} catch (error) {
			throw error;
		}
	}
	async getTheTableNameByUserType(userType) {
		switch (userType) {
			case 'customer':
				return 'customertable';
			case 'seller':
				return 'sellertable';
			case 'admin':
				return 'admintable';
			default:
				throw new Error('Invalid user type');
		}
	}
}

export { UserService };
