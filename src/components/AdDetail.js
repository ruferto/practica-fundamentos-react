import React from 'react';
import { deleteAdvert, getAdvertDetail } from '../api/adverts'
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import ConfirmationPanel from './ConfirmationPanel';
import NotFoundPage from './NotFoundPage';

const AdDetail = ({adId, queries, setQueries}) => {
    const [ad, setAd] = React.useState();
    const [deletedAd, setDeletedAd] = React.useState(null);
    const [tryToDelete, setTryToDelete] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true)

    const handleDelete = async ()=>{
        setTryToDelete(true);
    }

    const deleteSure = async () => {
        try{
            const res = await deleteAdvert(adId.params.id);
            setDeletedAd(res)
        }catch(error){
            console.log(error);
            setTryToDelete(false)
        }
    }

    const cancelDelete = () => {
        setTryToDelete(false);
    }
const stop=()=>{setIsLoading(false)}
    React.useEffect(() => {
        try{
            setIsLoading(true)
            getAdvertDetail(adId.params.id).then(setAd).then(stop);
        }catch(error){
            //console.error(error);
            stop();
        }
        
    }, [adId.params.id]);

    if(deletedAd){
        return <Redirect to="/" />
    }
    if(isLoading) return <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

    if(!ad) return <NotFoundPage />
    return <div style={{textAlign:'center'}}>
        
                {tryToDelete ? 
                <ConfirmationPanel deleteSure={deleteSure} cancelDelete={cancelDelete} message={'Are you sure?'} subtitle={'(This action can\'t be undone)'} /> : ''}
                <div style={{paddingTop:20, paddingBottom:20}}>
                    <Link to={{pathname:'/', queries: queries}}>
                        <button>Back</button>
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