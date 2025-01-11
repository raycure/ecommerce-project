function buildWhereClause(conditions) {
	const clauses = conditions.map((item) => `${item} = ?`).join(' AND ');
	return `WHERE ${clauses}`;
}

function buildJoinClauses(tables, joinConditions) {
	console.log('tables', tables, typeof tables);

	const joinClauses = tables
		.map((table, index) => {
			const tableName = table.alias
				? `${table.name} ${table.alias}`
				: table.name;
			const condition = joinConditions[table.name] || '';
			return `JOIN ${tableName} ON ${condition}`;
		})
		.join('\n \t \t');
	return joinClauses;
}
export { buildJoinClauses, buildWhereClause };
