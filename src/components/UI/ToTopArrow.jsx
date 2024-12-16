import { HashLink } from 'react-router-hash-link';
import { IoIosArrowUp } from 'react-icons/io';
import './UI.css';
import React from 'react';
function ToTopArrow() {
	return (
		<HashLink aria-label='return top arrow' className='to-top-arrow' to='#top'>
			<IoIosArrowUp size='2rem' opacity={0.7} />
		</HashLink>
	);
}
export default ToTopArrow;
