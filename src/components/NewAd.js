import React from 'react';
import { Redirect } from 'react-router';
// import dataService from '../Dataservice.js';
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

    const handleSubmit = async(event) => {
        event.preventDefault();
        try{
            //await saveAdvert(formValues, setCreated);
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
    
    return <div className="new-ad-container">
        
        <form className="form-add" method="POST" onSubmit={handleSubmit}>

            <div>
                <label for="name" ><br />Nombre</label><br />
                <input type="text" name="name" className="ad-name" id="name" placeholder="Artículo" onChange={handleChange}/>
            </div>
            <div>
                <label for="precio">Precio</label><br />
                <input type="number" step="0.01" min="0" name="price" id="price" className="ad-price" placeholder="0,00" onChange={handleChange} />
                {/* <select className="ad-sale select-css" name="sale" id="sale" onChange={handleChange} >
                    <option value={true} selected>Vender</option>
                    <option value={false}>Comprar</option>
                </select> */}
                <div>
                    <div><input id='sale' name='sale' type='radio' value={true} onChange={handleChange} defaultChecked /><label>Sale</label></div>
                    <div><input id='sale' name='sale' type='radio' value={false} onChange={handleChange}/><label>Buy</label></div>
                </div>
            </div>

            <div>
                <label for="tags">Tags</label><br />
                {/* <input type="text" className="ad-tags" name="tags" id="tags" placeholder="Separados por comas" onChange={handleChange} /> */}
            </div>
            <SelectTag handleChange={handleChange} />
            <div>
                <label for="photo">Imagen</label><br />
                <input ref={fileRef} type="file" className="ad-photo" name="photo" id="photo" accept="image/*" onChange={handleChange} />
            </div>
            {/* <FileInput value='' onChange={handleChange} /> */}
            <button type="submit" className="buttonAdd" >Publicar</button>
        
        </form>
    </div>
    
}
export default NewAd