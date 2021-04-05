import React from 'react';
import { Link } from 'react-router-dom';
import Tags from './Tags';

const Advert = ( {ad, queries} ) => {
    return (
        <li className='ad-container' key={ad.id}>
      <Link to={{pathname: `/advert/${ad.id}`, queries:{queries}}} >
        <div>
        { (ad.sale) ? 'Sell' : 'Buy' }:
        <div className='ad-name'><b>{ ad.name }</b></div>
        <div className='price'>
            { ad.price % 1 !== 0 ? 
            Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(ad.price) : 
            Intl.NumberFormat('de-DE').format(ad.price)+' €' }
        </div>
        <div className='tags'>Etiquetas: &nbsp;<Tags tagsArray={ad.tags}/></div>
        </div>
        </Link>
      </li>
    )
}

export default Advert
