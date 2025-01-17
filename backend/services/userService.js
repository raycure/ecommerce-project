import { buildJoinClauses, buildWhereClause } from './helperFunctions.js';
class UserService {
	constructor(pool) {
		this.pool = pool;
	}

	async findData(inputData) {
		const { table, ...queryFields } = inputData;
		try {
			const hasQueryFields = Object.keys(queryFields).length > 0;
			let query = `SELECT * FROM ${table}`;
			const fields = Object.keys(queryFields);
			const values = Object.values(queryFields);
			if (hasQueryFields) {
				query = `SELECT * FROM ${table} WHERE ${fields
					.map((field) => `${field} = ?`)
					.join(' OR ')}`;
				const [rows] = await this.pool.query(query, values);
				return rows[0];
			}
			// todo maybe add a and option for where clause

			// query = `
			// 	SELECT * FROM ${table}
			// 	WHERE ${fields.map((field) => `${field} = ?`).join(' OR ')}
			// `;
			// console.log('find query ', query);

			// const [rows] = await this.pool.query(query);
			// return rows;
		} catch (error) {
			throw error;
		}
	}

	async insertOrderItems(boughtProducts, orderId) {
		// Process items sequentially instead of in parallel
		for (const item of boughtProducts) {
			const { price, amount, sellerId, productId, seller_productId } = item;
			const orderInsert = {
				table: 'orderitemtable',
				price,
				amount,
				sellerId,
				orderId,
				productId,
				seller_productId,
			};

			// Retry logic is handled inside insertData
			await this.insertData(orderInsert);
		}
	}

	async insertData(userData) {
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
			console.log('insert results', result);

			return result;
		} catch (error) {
			throw error;
		}
	}

	async updateData(identificationData, updateData) {
		try {
			const { table } = identificationData;
			delete identificationData.table;
			const fields = Object.keys(updateData);
			const values = Object.values(updateData);

			// Build SET clause dynamically
			const setClause = fields.map((field) => `${field} = ?`).join(', ');
			const fieldsForWhere = Object.keys(identificationData);
			const valuesForWhere = Object.values(identificationData);

			const query = `
					UPDATE ${table}
					SET ${setClause}
					WHERE ${fieldsForWhere.map((field) => `${field} = ?`).join(' OR ')}
				`;

			console.log('update query:', query);
			values.push(...valuesForWhere);

			const [result] = await this.pool.query(query, values);
			console.log('result', result);

			return result;
		} catch (error) {
			throw error;
		}
	}

	async deleteData(identificationData) {
		try {
			const { table } = identificationData;
			delete identificationData.table;

			const fieldsForWhere = Object.keys(identificationData);
			const valuesForWhere = Object.values(identificationData);

			const query = `
				DELETE FROM ${table}
				WHERE ${fieldsForWhere.map((field) => `${field} = ?`).join(' OR ')}
			`;
			console.log('delete query:', query);

			const [result] = await this.pool.query(query, valuesForWhere);
			console.log('result', result);

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

	async buildSubquery(
		clauseType,
		tables,
		selectColumns,
		whereConditions = {},
		joinConditions = {}
	) {
		const mainTable = tables[0].name + ' ' + tables[0].alias;
		tables.shift();
		whereConditions =
			whereConditions.length > 0 ? buildWhereClause(whereConditions) : '';
		clauseType = clauseType === '' ? 'SELECT' : clauseType;
		const query = `
		  ${clauseType} ${selectColumns}
		  FROM ${mainTable}
		  ${buildJoinClauses(tables, joinConditions)}
		  ${whereConditions}
		  `;

		return query;
	}

	// Function to build the final query with joins
	async buildFullQuery(
		tables,
		selectColumns,
		joinConditions,
		whereConditions,
		subqueryResult,
		subqueryName = 'subq'
	) {
		console.log('tables in full', tables, typeof tables);

		const fullQuery = `
		  SELECT ${subqueryName}.*,
		  ${selectColumns}
		  FROM (
			${subqueryResult}
		  ) as subq
		   ${buildJoinClauses(tables, joinConditions)}
		${typeof whereConditions === 'string' ? buildWhereClause(whereConditions) : ''}
		  `;

		// console.log('in buildFullQuery fullQuery', fullQuery);
		return fullQuery;
	}
}

export { UserService };
