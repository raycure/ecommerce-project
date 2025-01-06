import { pool } from '../config/db.js';
class UserService {
	constructor(pool) {
		this.pool = pool;
	}

	async findUser(userData) {
		const { table, ...queryFields } = userData;
		try {
			const hasQueryFields = Object.keys(queryFields).length > 0;
			let query = `SELECT * FROM ${table}`;
			if (hasQueryFields) {
				const fields = Object.keys(queryFields);
				const values = Object.values(queryFields);
				query = `SELECT * FROM ${table} WHERE ${fields
					.map((field) => `${field} = ?`)
					.join(' OR ')}`;
				const [rows] = await this.pool.query(query, values);
				return rows[0];
			}

			query = `
				SELECT * FROM ${table}
				WHERE ${fields.map((field) => `${field} = ?`).join(' OR ')}
			`;
			console.log('select query:', query);
			const [rows] = await this.pool.query(query);
			return rows;
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
	async updateUser(userIdentification, updateData) {
		try {
			const { table, phone, email } = userIdentification;
			console.log(userIdentification);

			const fields = Object.keys(updateData);
			const values = Object.values(updateData);

			// Build SET clause dynamically
			const setClause = fields.map((field) => `${field} = ?`).join(', ');

			const query = `
					UPDATE ${table}
					SET ${setClause}
					WHERE email = ? OR phone = ?
				`;

			console.log('update query:', query);

			// Add identification values to the values array
			values.push(email, phone);
			console.log('values', values);

			const [result] = await this.pool.query(query, values);
			return result;
		} catch (error) {
			throw error;
		}
	}
}

export { UserService };
