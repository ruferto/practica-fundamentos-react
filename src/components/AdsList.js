import React from 'react';
// import dataservice from '../Dataservice.js';
import Tags from './Tags.js';
import QueryForm from './QueryForm.js';
import { Link } from 'react-router-dom';
import { getLatestAdverts } from '../api/adverts.js';

const QUERIES_KEY = 'queries';

const AdsList = ({ queries, setQueries }) => {

    const handleChange = (event) => { 

      setQueries(oldValue => {
            const newValue = event.target ?
            {
              ...oldValue,
              [event.target.name]: event.target.value,
            } :
            {
              ...oldValue,
              tags: event.length ? event : ''
            }
            ;
            localStorage.setItem(QUERIES_KEY, JSON.stringify(newValue));
            return newValue;
          });
          
      }

  const [ads, setAds] = React.useState([]);
  
  React.useEffect(() => {
    // setTimeout( ()=>{
      getLatestAdverts().then(setAds);
    // },200);
    
  }, []);
  

  const filtered = ads.filter( ad => 
    ad.price >= queries.precio[0] &&
    ad.price <= queries.precio[1] &&
    ad.name.toLowerCase().includes(queries.nombre.toLowerCase()) &&
    ((ad.sale.toString() === queries.venta ) || (queries.venta === '') ) &&
    ad.tags.filter(tag => queries.tags.includes(tag)).length === queries.tags.length
  );

  const adsElement = filtered.map( ad => {
    
    // const adImage = <img className="img-ad" src={ ad.foto} width="180" alt={ad.nombre} />;
    return <li className="ad-container" key={ad.id}>
      <Link to={{pathname: `/advert/${ad.id}`, queries:{queries}}} >
        <div>
        { (ad.sale) ? 'Se vende' : 'Se compra' }:
        <div className="ad-name"><b>{ ad.name }</b></div>
        {/* <div className="img-container">
          {adImage}
        </div> */}
        <div className="price">{ ad.price % 1 !== 0 ? Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(ad.price) : Intl.NumberFormat('de-DE').format(ad.price)+' €' }</div>
        <div className="tags">Etiquetas: &nbsp;<Tags tagsArray={ad.tags}/></div>
        </div>
        </Link>
      </li>
  });

    
    return (
      <div>
        <QueryForm queries={queries} setQueries={setQueries} handleChange={handleChange}/>
        <div className='ads-list'>
          {adsElement.length !==0 ? adsElement : <div style={{fontSize: 20, paddingTop:40, textAlign:'center'}}>No hay anuncios con ese filtro<br /><a href='/login'>Prueba a crear uno</a></div>}{/*<Redirect to={`/login`} />}*/}
        </div>
      </div>
    );
  }
  
  export default AdsList;