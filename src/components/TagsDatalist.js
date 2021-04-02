import dataService from '../Dataservice.js'
import React from 'react';


const TagsDatalist = ( {queries} ) => {

    const handleTagOptions = (event) => {
        console.log(event.target.selectedOptions)
    }
    const [tags, setTags] = React.useState([]);
    React.useEffect(() => {
        dataService.getTagsList(queries).then(setTags);
      }, [queries]);
    
    const tagsList = tags.map( tag => (
        <option key={tag} value={tag}>{tag}</option>
    ));
    return <select id="tags" name="tags" multiple={true} onChange={handleTagOptions}>
                {tagsList}
    </select>;
}

export default TagsDatalist;