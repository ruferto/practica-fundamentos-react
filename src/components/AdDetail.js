import React from 'react';
import { deleteAdvert, getAdvertDetail } from '../api/adverts'
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

const AdDetail = ({adId, queries}) => {
    const [ad, setAd] = React.useState();
    const [deletedAd, setDeletedAd] = React.useState(null);

    const handleDelete = async ()=>{
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure?')){
            try{
                const res = await deleteAdvert(adId.params.id);
                console.log(res)
                setDeletedAd(res)
            }catch(error){
                console.log(error);
            }            
        }
    }

    React.useEffect(() => {
        try{
            getAdvertDetail(adId.params.id).then(setAd);
        }catch(error){
            console.error(error);
        }
        
    }, [adId.params.id]);

    if(deletedAd){
        return <Redirect to="/" />
    }
    if(!ad) return <div>Advert not found</div>
    return <div style={{padding:30, textAlign:'center'}}>
                <div style={{paddingTop:20, paddingBottom:20}}>
                    <Link to={{pathname:'/', queries: queries}}>
                        <button>Volver</button>
                    </Link>
                    <button className='delete-button' onClick={handleDelete}>Borrar</button>
                </div>
                <div style={{padding:10}}>{ad.name}</div>
                <div>{ad.sale ? 'For sale' : 'Someone buys'}</div>
                <div>Price: {ad.price}</div>
                <img src={ad.photo ? `${process.env.REACT_APP_API_BASE_URL}${ad.photo}` : '../../images/back.png'} alt={ad.name} />
            </div>
}

export default AdDetail;