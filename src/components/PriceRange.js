import React from 'react';
import Slider from 'rc-slider';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const wrapperStyle = { width: '29vw', margin: 5 };

const PriceRange = ({ initialRange, onChange, maxPricef }) => {
	const maxPrice = maxPricef();

	const [valuesState, setValuesState] = React.useState(initialRange);

	React.useEffect(() => {
		setValuesState(initialRange);
	}, [initialRange]);

	const changeRange = (values) => {
		setValuesState(values);
		onChange({
			target: {
				name: 'precio',
				value: values,
			},
		});
	};

	const style = { color: 'lightgray', width: 100 };

	return (
		<div>
			<div style={wrapperStyle}>
				<Range
					style={{ paddingBottom: 30 }}
					step={1}
					marks={{
						0: { style: {}, label: `0` },
						[maxPrice]: { style: { style }, label: `${maxPrice}` },
						// 1000: {style:{style},
						// label: `1000`},
						[maxPrice / 2]: { style: { style }, label: `${[maxPrice] / 2}` },
						// 3000: {style:{style},
						// label: `3000`},
						// 4000: {style:{style},
						// label: `4000`}
					}}
					min={0}
					max={maxPrice}
					value={valuesState}
					defaultValue={initialRange}
					tipFormatter={(value) => {
						return `${value}€`;
					}}
					onChange={changeRange}
					allowCross={false}
				/>
				{/* <p style={{color: 'gray', textAlign:'center', paddingBottom:10}}>Between <span style={{color:'#109c8a',fontSize:18}}>{valuesState[0]} €</span> and <span style={{color:'#109c8a',fontSize:18}}>{`${valuesState[1]} €`}</span></p> */}
			</div>
		</div>
	);
};

export default PriceRange;
