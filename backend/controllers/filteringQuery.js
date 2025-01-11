const buildProductQuery = (filters) => {
	const baseQuery = `SELECT subq.*,
      c.categoryName,
      b.brandName
    FROM (
      SELECT
        sp.stock,
        sp.price,
        p.*,
        s.*
      FROM seller_producttable sp
      JOIN sellertable s ON sp.sellerId = s.sellerId
      JOIN producttable p ON sp.productId = p.productId
    ) as subq
    JOIN categorytable c ON subq.category = c.categoryId
    JOIN brandtable b ON subq.brand = b.brandId`;

	const conditions = [];
	const values = [];
	let paramCount = 1;

	// Price range filter
	if (filters.minPrice !== undefined) {
		conditions.push(`subq.price >= $${paramCount}`);
		values.push(filters.minPrice);
		paramCount++;
	}
	if (filters.maxPrice !== undefined) {
		conditions.push(`subq.price <= $${paramCount}`);
		values.push(filters.maxPrice);
		paramCount++;
	}

	// Category filter
	if (filters.categories && filters.categories.length > 0) {
		conditions.push(`subq.category = ANY($${paramCount})`);
		values.push(filters.categories);
		paramCount++;
	}

	// Brand filter
	if (filters.brands && filters.brands.length > 0) {
		conditions.push(`subq.brand = ANY($${paramCount})`);
		values.push(filters.brands);
		paramCount++;
	}

	// Stock availability filter
	if (filters.inStock === true) {
		conditions.push('subq.stock > 0');
	}

	// Seller filter
	if (filters.sellerId) {
		conditions.push(`subq.sellerId = $${paramCount}`);
		values.push(filters.sellerId);
		paramCount++;
	}

	// Search term for product name or description
	if (filters.searchTerm) {
		conditions.push(`(
        subq.productName ILIKE $${paramCount} 
        OR subq.description ILIKE $${paramCount}
      )`);
		values.push(`%${filters.searchTerm}%`);
		paramCount++;
	}

	// Sorting
	let orderByClause = '';
	if (filters.sortBy) {
		const sortField =
			{
				price_asc: 'subq.price ASC',
				price_desc: 'subq.price DESC',
				name_asc: 'subq.productName ASC',
				name_desc: 'subq.productName DESC',
				stock_asc: 'subq.stock ASC',
				stock_desc: 'subq.stock DESC',
			}[filters.sortBy] || 'subq.productId DESC';

		orderByClause = ` ORDER BY ${sortField}`;
	}

	// Pagination
	const limit = filters.limit || 10;
	const offset = filters.page ? (filters.page - 1) * limit : 0;
	const paginationClause = ` LIMIT ${limit} OFFSET ${offset}`;

	// Combine all parts
	const whereClause =
		conditions.length > 0 ? ` WHERE ${conditions.join(' AND ')}` : '';

	const finalQuery = baseQuery + whereClause + orderByClause + paginationClause;

	return {
		text: finalQuery,
		values: values,
	};
};
