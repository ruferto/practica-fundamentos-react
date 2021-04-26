import React from 'react';

const Loading = ({ isLoading }) => {
	return isLoading ? (
		<div className='lds-roller'>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	) : (
		''
	);
};

export default Loading;
