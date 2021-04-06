import React from 'react';
import Slider from 'rc-slider';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const wrapperStyle = { width: '38vw', margin: 10 };

const PriceRange = ({initialRange, onChange}) => {

  const [valuesState, setValuesState] = React.useState(initialRange);

  React.useEffect(() => {
    setValuesState(initialRange);
    }, [initialRange])

    const changeRange = (values) => {
        setValuesState(values);
        onChange({
          target:{
              name: 'precio',
              value: values
          },
      });
    }

  return <div>
    <div style={wrapperStyle}>
      
      <Range 
        style={{paddingBottom:30}}
        step={10} 
        marks={{
            0: {style:{color:'lightgray', width:100}, 
            label: `0`}, 
            5000: {style:{color:'lightgray', width:100}, 
            label: `5000`},
            2500: {style:{color:'lightgray', width:100}, 
            label: `2500`},
            1000: {style:{color:'lightgray', width:100}, 
            label: `1000`},
            4000: {style:{color:'lightgray', width:100}, 
            label: `4000`}
        }} 
        min={0} 
        max={5000} 
        value={valuesState}
        defaultValue={initialRange} 
        tipFormatter={value => `${value}€`} 
        onChange={changeRange} 
        allowCross={false}
        />
        <p style={{color: 'gray', textAlign:'center', paddingBottom:10}}>Between <span style={{color:'#109c8a',fontSize:18}}>{valuesState[0]} €</span> and <span style={{color:'#109c8a',fontSize:18}}>{valuesState[1]} €</span></p>
    </div>
  </div>
};

export default PriceRange