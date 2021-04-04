import React from 'react';
import SelectTag from './SelectTag.js';
import PriceRange from './PriceRange.js'

const QueryForm = ( {queries, setQueries, handleChange, handleReset} ) => {

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  // const cleanFilters = () => {
  //   const cleanFilter = {
  //     id:'',
  //     nombre:'',
  //     precio:[0,5000],
  //     venta:'',
  //     tags:''
  //   };
  //   setQueries(cleanFilter);

  //   refFilters.current.nombre.value = queries.nombre;
  //   refFilters.current.venta.value = queries.venta;
  //   refFilters.current.nombre.value = queries.nombre;

  //   console.log(refFilters.current.querySelector('.css-2b097c-container'))
  // }

  // const refFilters = React.useRef(null);

  return <>
    <form className="search-form" onSubmit={handleSubmit}>
      <img src='../../images/lupa-icon.png' width="15px" alt='none'/>
      <label >Nombre: </label>
      <input type="text" action="" id="nombre" name="nombre" value={queries.nombre} onChange={handleChange}/>
      <select id="venta" name="venta" value={queries.venta} onChange={handleChange}>
        <option value="">Todos</option>
        <option value="true" >Venta</option>
        <option value="false" >Compra</option>
      </select>
      Tags: <SelectTag id='precio' name='precio' handleChange={handleChange} selected={queries.tags}/>
      <PriceRange initialRange={queries.precio} value={queries.precio} onChange={handleChange} />
  </form>
  <button onClick={handleReset}>Clean</button>
  </>;

}

export default QueryForm;