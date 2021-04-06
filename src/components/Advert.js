import React from 'react';
import { Link } from 'react-router-dom';
import Tags from './Tags';

const Advert = ( {ad, queries} ) => {
    return (
      <Link to={{pathname: `/advert/${ad.id}`, queries:{queries}}} >

        <li className='ad-container' key={ad.id}>
        
        
        <div className='ad-name'><b>{ ad.name }</b></div>
        
        <div style={{display:'flex', flexDirection:'row'}}>
        <div>{ (ad.sale) ? 'Sell' : 'Buy' }</div>
        <div className='price'>
            { ad.price % 1 !== 0 ? 
            Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(ad.price) : 
            Intl.NumberFormat('de-DE').format(ad.price)+' €' }
        </div>
        </div>
        <div className='tags'>Tags: &nbsp;<Tags tagsArray={ad.tags}/></div>
        
        
        
        
      </li>
      </Link>
    )
}

export default Advert
