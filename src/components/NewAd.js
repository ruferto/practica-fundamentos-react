import React from 'react';
import { Redirect } from 'react-router';
import SelectTag from './SelectTag';
import { saveAd } from '../api/adverts'

const NewAd = () => {

    React.useEffect(() => {
        
        stopLoading();
        inputRef.current.focus();

    }, []);

    const [formValues, setFormValues] = React.useState({
        name:'',
        price:0,
        sale: true,
        tags:[]
    });

    const [created, setCreated] = React.useState();
    const [tags, setTags] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const inputRef = React.useRef(null);

    const stopLoading = () => {
        setIsLoading(false);
    };
    const startLoading = () => {
        setIsLoading(true);
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        try{
            startLoading();
            setCreated(await saveAd(formValues));
        }catch(error){
            setError(error)
            console.log(error);
        }
    }

    const handleChange = (event) => {
        
        if(event.target && event.target.name === 'photo'){
            setFormValues( oldValue => {
                const newValue = 
                {
                  ...oldValue,
                  photo: fileRef.current.files[0]
                }
                return newValue;
            });
        }else{
            setFormValues( oldValue => {
                const newValue = event.target ?
                {
                ...oldValue,
                [event.target.name]: event.target.value,
                } :
                {
                ...oldValue,
                tags: event.length ? event : ''
                }

                return newValue;
            });
        }
    }

    const fileRef = React.useRef(null);
    
    if(created){
        return <Redirect to={`/advert/${created.id}`} />
    }

    if(isLoading)
        return <div className='lds-roller'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    
    return <div className='new-ad-container'>
        
        <form className='form-add' method='POST' onSubmit={handleSubmit} noValidate >

            <div>
                <label htmlFor='name' ><br />Name</label><br />
                <input ref={inputRef} type='text' name='name' className='ad-name-input' id='name' placeholder='Article' onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor='precio'>Price</label><br />
                <input type='number' step='0.01' min='0' name='price' id='price' className='ad-price' placeholder='0,00' onChange={handleChange} />
                <div>
                    <div><input id='sale' name='sale' type='radio' value={true} onChange={handleChange} defaultChecked /><label>Sale</label></div>
                    <div><input id='sale' name='sale' type='radio' value={false} onChange={handleChange}/><label>Buy</label></div>
                </div>
            </div>

            <div>
                <label htmlFor='tags'>Tags</label><br />
            </div>
            <SelectTag handleChange={handleChange} selected={tags} setTagsForNew={setTags}/>
            <div>
                <label htmlFor='photo'>Photo</label><br />
                <input ref={fileRef} type='file' className='ad-photo' name='photo' id='photo' accept='image/*' onChange={handleChange} />
            </div>
            <button type='submit' className='buttonAdd' disabled={!(formValues.name !== '' && formValues.price !== '' && formValues.tags.length > 0)} >Publish</button>
        
        </form>
        {error ? <div style={{color: 'white', backgroundColor:'red', padding: 10, borderRadius: '15px', width:'33vw', textAlign:'center', marginTop: 100, marginLeft: 'auto', marginRight: 'auto'}}>Error: {error.message}</div> : ''}
    </div>
    
}
export default NewAd