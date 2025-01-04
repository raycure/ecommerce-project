import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function AdCarousel() {
	const adPicData = [
		'https://www.rudaw.net/s3/rudaw.net/ContentFiles/809545Image1.jpg?version=6745386',
		'https://images.squarespace-cdn.com/content/v1/57302e3040261d2ef98c91c0/1504757176380-HUXVP37CZWQ9ARBM394S/Screen-Shot-2015-06-25-at-11.01.00-PM-760x418.png?format=1000w',
		'https://cdn2.avada.io/media/resources/6c2s1sb.jpg',
		'https://image.adsoftheworld.com/ah0v05n7rpak5gqquxjb6vhinw9t',
	];
	return (
		<Carousel>
			{adPicData.map((image, index) => (
				<Carousel.Item
					style={{
						height: '75vh',
					}}
					interval={2000}
					key={index}
				>
					<img
						style={{
							width: '100vw',
							objectFit: 'contain',
						}}
						className='d-block w-100'
						src={image}
						alt=''
					/>
				</Carousel.Item>
			))}
		</Carousel>
	);
}
export default AdCarousel;
