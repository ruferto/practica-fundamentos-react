import React from 'react';
// import dataService from '../Dataservice.js';
import SelectTag from './SelectTag.js';
import PriceRange from './PriceRange.js'

const QueryForm = ( {queries, handleChange} ) => {
    //const queries = dataService.getStringQueries();
    // console.log(queries)

      // const handleTagChange = (event) => {
        
      //   console.log(event.target.selectedOptions);
      //   const selectedTags = Array.from(event.target.selectedOptions).map( tag => tag.value);
      //   console.log(selectedTags)
      //   handleChange(selectedTags)
      // }

      const handleSubmit = (event) => {
          event.preventDefault();
        //setQueries();
      }

      // const [tags, setTags] = React.useState([]);
        
      // React.useEffect(() => {
      //     //const qTags = queries.tags;
      //     dataService.getTagsList(queries.tags).then(setTags);
      //   }, [queries.tags]);




      //   const tagsList = tags.map( tag => (
      //     <option key={tag} value={tag}>{tag}</option>
      // ));
      
    
  return <div style={{}}>
      <form className="search-form" onSubmit={handleSubmit}>
  <img src='../../images/lupa-icon.png' width="15px" alt='none'/>
  <label >Nombre: </label>
  <input type="text" action="" id="nombre" name="nombre" value={queries.nombre} onChange={handleChange}/>
  <select id="venta" name="venta" value={queries.venta} onChange={handleChange}>
    <option value="">Todos</option>
    <option value="true" >Venta</option>
    <option value="false" >Compra</option>
  </select>
  {/* <label >Etiqueta: </label>
  <input id="tags" list="tags-datalist" name="tags" value={queries.tags} onChange={handleChange} autoComplete="off" /> */}
  {/* <TagsDatalist queries={queries}/> */}
    {/* <select id="tags" name="tags" value={queries.tags.length ? queries.tags : []} multiple={true} onChange={handleTagChange}>
                {tagsList}
    </select> */}
    Tags: <SelectTag handleChange={handleChange} selected={queries.tags}/>
    {/* <PriceRangeOld initialRange={queries.precio} onChange={handleChange} /> */}
    <PriceRange initialRange={queries.precio} onChange={handleChange} />
  </form>
  </div>;

}

export default QueryForm;