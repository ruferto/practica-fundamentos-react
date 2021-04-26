import React from 'react';
import SelectTag from './SelectTag';
import PriceRange from './PriceRange';

const QueryForm = ({ queries, handleChange, handleReset, maxPrice }) => {
	const handleSubmit = (event) => {
		event.preventDefault();
	};
	return (
		<>
			<form className='search-form' onSubmit={handleSubmit}>
				<div className='form-wrapper'>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							marginRight: '1rem',
						}}
					>
						<label>Name: </label>
						<input
							className='name-qForm'
							type='text'
							action=''
							id='nombre'
							name='nombre'
							value={queries.nombre}
							onChange={handleChange}
						/>
						Type:{' '}
						<select
							style={{ fontSize: 18, padding: 5, borderRadius: '5px' }}
							id='venta'
							name='venta'
							value={queries.venta}
							onChange={handleChange}
						>
							<option value=''>All</option>
							<option value='true'>Sell</option>
							<option value='false'>Buy</option>
						</select>
					</div>

					<div>
						Tags:{' '}
						<SelectTag
							id='tags'
							name='tags'
							handleChange={handleChange}
							selected={queries.tags}
						/>
						Price:{' '}
						<PriceRange
							initialRange={queries.precio}
							value={queries.precio}
							onChange={handleChange}
							maxPricef={maxPrice}
						/>
					</div>
					<div>
						<button
							style={{ marginTop: 35, marginLeft: 10 }}
							onClick={handleReset}
						>
							Clean
							<br />
							filters
						</button>
					</div>
				</div>
			</form>
		</>
	);
};

export default QueryForm;
