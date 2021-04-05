import React from 'react';
import Select from 'react-select';
import { getTags } from '../api/adverts';

const SelectTag = ({ handleChange, selected, setTagsForNew}) => {

    const [tags, setTags] = React.useState([]);
    React.useEffect( ()=> {
        getTags().then(setTags);
    },[])
    
    const tagsList = tags.map(tag => {
        return { label: tag, value: tag }
    })

    const selectedTags = (selected && selected.length) ? selected.map( (tag) => {return {label: tag, value: tag}} ): [];
    
    const changeTags = (event) => {
        if(handleChange){
            const qTags = event.map( tag => tag.label );
            if(setTagsForNew) setTagsForNew(qTags)
            handleChange(qTags);
        }
    }
    
    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          width: '400px'
        })
    }
    return (
        <Select 
            styles={ customStyles } 
            value={ selectedTags } 
            defaultValue={ selectedTags } 
            options={ tagsList } 
            onChange={ changeTags } 
            isMulti
        />
    )
}

export default SelectTag;