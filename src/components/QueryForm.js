import React from 'react';
import SelectTag from './SelectTag';
import PriceRange from './PriceRange'

const QueryForm = ( {queries, handleChange, handleReset} ) => {

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return <>
    <form className='search-form' onSubmit={handleSubmit}>
      <div className='form-wrapper'>
      <img src='../../images/lupa-icon.png' width='15px' alt='none'/>
      <label >Name: </label>
      <input type='text' action='' id='nombre' name='nombre' value={queries.nombre} onChange={handleChange}/>
      <select id='venta' name='venta' value={queries.venta} onChange={handleChange}>
        <option value=''>All</option>
        <option value='true' >Sell</option>
        <option value='false' >Buy</option>
      </select>
      Tags: <SelectTag id='tags' name='tags' handleChange={handleChange} selected={queries.tags}/>
      <PriceRange initialRange={queries.precio} value={queries.precio} onChange={handleChange} />
      </div>
  </form>
  <button onClick={handleReset}>Clean<br />filters</button>
  </>;

}

export default QueryForm;