import React from 'react';
import SelectTag from './SelectTag';
import PriceRange from './PriceRange'

const MAX_PRICE = 5000;

const QueryForm = ( {queries, handleChange, handleReset} ) => {

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return <>
    <form className='search-form' onSubmit={handleSubmit}>
      <div className='form-wrapper'>
      
      <div style={{display:'flex', flexDirection:'column', marginRight:'1rem'}}><label >Name: </label>
      <input className='name-qForm' type='text' action='' id='nombre' name='nombre' value={queries.nombre} onChange={handleChange}/>
      Type: <select id='venta' name='venta' value={queries.venta} onChange={handleChange}>
        <option value=''>All</option>
        <option value='true' >Sell</option>
        <option value='false' >Buy</option>
      </select></div>
      
      <div >Tags: <SelectTag id='tags' name='tags' handleChange={handleChange} selected={queries.tags}/>
      Price: <PriceRange initialRange={queries.precio} value={queries.precio} onChange={handleChange} maxPrice={MAX_PRICE}/></div>
      <div ><button style={{marginTop:33}} onClick={handleReset}>Clean<br />filters</button></div>
      </div>
      
  </form>
  
  </>;

}

export default QueryForm;