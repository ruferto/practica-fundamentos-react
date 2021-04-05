import React from 'react';
import { Redirect } from 'react-router';
import SelectTag from './SelectTag.js';
import { saveAd } from '../api/adverts'

const NewAd = () => {

    const [formValues, setFormValues] = React.useState({
        name:'',
        price:0,
        sale: true,
        tags:[]
    });

    const [created, setCreated] = React.useState();
    const [tags, setTags] = React.useState([])

    const handleSubmit = async(event) => {
        event.preventDefault();
        try{
            setCreated(await saveAd(formValues))
        }catch(e){
            console.log(e);
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
    
    return <div className='new-ad-container'>
        
        <form className='form-add' method='POST' onSubmit={handleSubmit}>

            <div>
                <label htmlFor='name' ><br />Name</label><br />
                <input type='text' name='name' className='ad-name' id='name' placeholder='Article' onChange={handleChange}/>
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
            <button type='submit' className='buttonAdd' >Publish</button>
        
        </form>
    </div>
    
}
export default NewAd