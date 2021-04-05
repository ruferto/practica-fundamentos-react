import React from 'react';
import { deleteAdvert, getAdvertDetail } from '../api/adverts'
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import ConfirmationPanel from './ConfirmationPanel';
import NotFoundPage from './NotFoundPage';

const AdDetail = ({adId}) => {
    const [ad, setAd] = React.useState();
    const [deletedAd, setDeletedAd] = React.useState(null);
    const [tryToDelete, setTryToDelete] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const handleDelete = async ()=>{
        setTryToDelete(true);
    }

    const deleteSure = async () => {
        try{
            const res = await deleteAdvert(adId.params.id);
            setDeletedAd(res);
        }catch(error){
            console.log(error);
            setError(error);
        }finally{
            setTryToDelete(false);
        }
    }

    const cancelDelete = () => {
        setTryToDelete(false);
    }

    const stop = () => {
        setIsLoading(false);
    }

    const anError = (e) => {
        setError(e);stop();
    }

    React.useEffect(() => {
        setIsLoading(true)
        getAdvertDetail(adId.params.id)
        .then(setAd)
        .then(stop)
        .catch(anError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [adId.params.id]);

    if(deletedAd){
        return <Redirect to="/" />
    }
    if(isLoading) return <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

    if(error && error.status === 404) return <NotFoundPage />

    if(error)
      return <div style={{color: 'white', backgroundColor:'red', padding: 10, borderRadius: '15px', width:'33vw', textAlign:'center', marginTop: 100, marginLeft: 'auto', marginRight: 'auto'}}>Error: {error.message}</div>

    return <div style={{textAlign:'center'}}>
        
                {tryToDelete ? 
                <ConfirmationPanel deleteSure={deleteSure} cancelDelete={cancelDelete} message={'Are you sure?'} subtitle={'(This action can\'t be undone)'} /> : ''}
                <div style={{paddingTop:20, paddingBottom:20}}>
                    <Link to='/'>
                        <button>Back to list</button>
                    </Link>
                    <button className='delete-button' onClick={handleDelete}>Delete</button>
                </div>
                <div style={{display: 'flex', flexDirection:'row-end', flexWrap:'wrap', justifyContent:'left', float:'right', paddingRight:'10vw'}}>
                    <div style={{display: 'flex', flexDirection:'column', textAlign:'right', fontFamily:'SanchezFont', fontSize:35}}>
                        <div style={{padding:10}}>
                            <div>
                                {ad.sale ? 'For sale' : 'Wanted'}
                            </div>
                            <span style={{fontSize:50}}><b>{ad.name}</b></span></div>
                
                            <div>Price: <span style={{fontSize:45}}>{ad.price}€</span></div>
                        </div>
                        <div style={{width:'50vw'}}>
                            <img style={{borderRadius:'25px', maxHeight:'70vh'}} src={ad.photo ? `${process.env.REACT_APP_API_BASE_URL}${ad.photo}` : '../../images/back.png'} alt={ad.name} />
                        </div>
                    </div>
            </div>
}

export default AdDetail;