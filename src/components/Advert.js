import React from 'react';
import { Link } from 'react-router-dom';
import Tags from './Tags';

const Advert = ({ ad, queries }) => {
	const style = ad.sale
		? {
				color: 'white',
				backgroundColor: '#1c8d7e',
				borderRadius: 5,
				padding: 5,
				height: 28,
		  }
		: { backgroundColor: 'lightblue', borderRadius: 5, padding: 5, height: 28 };
	return (
		<Link to={{ pathname: `/advert/${ad.id}`, queries: { queries } }}>
			<li className='ad-container' key={ad.id}>
				<div className='ad-name'>
					<b>{ad.name}</b>
				</div>

				<div style={{ display: 'flex', flexDirection: 'row' }}>
					<div style={style}>{ad.sale ? 'Sell' : 'Buy'}</div>
					<div className='price'>
						{ad.price % 1 !== 0
							? Intl.NumberFormat('de-DE', {
									style: 'currency',
									currency: 'EUR',
							  }).format(ad.price)
							: Intl.NumberFormat('de-DE').format(ad.price) + ' €'}
					</div>
				</div>
				<div className='tags' style={{ fontSize: '1rem' }}>
					Tags: &nbsp;
					<Tags tagsArray={ad.tags} />
				</div>
			</li>
		</Link>
	);
};

export default Advert;
