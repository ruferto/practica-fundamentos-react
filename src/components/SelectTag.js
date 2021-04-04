import React from 'react';
import Select from 'react-select';
import Dataservice from '../Dataservice';

const SelectTag = ({ handleChange, selected}) => {

    const [tags, setTags] = React.useState([]);
    React.useEffect( ()=> {
        Dataservice.getTags().then(setTags);
    },[])
    
    const tagsList = tags.map(tag => {
        return {label: tag, value: tag }
    })

    const selectedTags = (selected && selected.length) ? selected.map( (tag) => {return {label: tag, value: tag}} ): [];
    // const [selectedTags, setSelectedTags] = React.useState((selected && selected.length) ? selected.map( (tag) => {return {label: tag, value: tag}} ): [])
    // React.useEffect(() => {
    //     setSelectedTags( selected.length ? selected.map( (tag) => {return {label: tag, value: tag}} ): []);
    // }, [selected]);

    const changeTags = (event) => {
        if(handleChange){
            const qTags = event.map( tag => tag.label );
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
        <Select styles={customStyles} value={selectedTags} defaultValue={selectedTags} options={ tagsList } onChange={changeTags} isMulti />
    )
}

export default SelectTag;