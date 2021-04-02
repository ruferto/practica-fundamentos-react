import React from 'react';
import SelectTag from './SelectTag.js';
import PriceRange from './PriceRange.js'

const QueryForm = ( {queries, handleChange} ) => {
    
  const handleSubmit = (event) => {
    event.preventDefault();
  }

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
      Tags: <SelectTag handleChange={handleChange} selected={queries.tags}/>
      <PriceRange initialRange={queries.precio} onChange={handleChange} />
  </form>
  </div>;

}

export default QueryForm;