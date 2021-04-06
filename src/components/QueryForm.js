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
      
      <label >Name: </label>
      <input style={{width:'30vw', fontSize:'1.5rem'}} type='text' action='' id='nombre' name='nombre' value={queries.nombre} onChange={handleChange}/>
      <select id='venta' name='venta' value={queries.venta} onChange={handleChange}>
        <option value=''>All</option>
        <option value='true' >Sell</option>
        <option value='false' >Buy</option>
      </select>
      <img src='../../images/lupa-icon.png' width='15px' alt='none'/>
      <div>Tags: <SelectTag id='tags' name='tags' handleChange={handleChange} selected={queries.tags}/></div>
      <PriceRange initialRange={queries.precio} value={queries.precio} onChange={handleChange} />
      </div>
  </form>
  <div><button onClick={handleReset}>Clean<br />filters</button></div>
  </>;

}

export default QueryForm;