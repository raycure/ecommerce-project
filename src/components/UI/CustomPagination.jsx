import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
function CustomPagination({
	paginationPageNumber,
	setPaginationPageNumber,
	pageAmount,
}) {
	const paginationNumbers = [...Array(pageAmount + 1).keys()].slice(1);

	function prePage() {
		if (paginationPageNumber !== 1) {
			setPaginationPageNumber(paginationPageNumber - 1);
		}
	}

	function nextPage() {
		if (paginationPageNumber !== pageAmount) {
			setPaginationPageNumber(paginationPageNumber + 1);
		}
	}

	function changePageNumber(id) {
		setPaginationPageNumber(id);
	}
	return (
		<Pagination>
			<Pagination.Prev onClick={prePage} />
			{paginationNumbers.map((number, index) => (
				<Pagination.Item
					active={paginationPageNumber === number}
					onClick={() => changePageNumber(number)}
				>
					{number}
				</Pagination.Item>
			))}
			<Pagination.Next onClick={nextPage} />
		</Pagination>
	);
}
export default CustomPagination;
