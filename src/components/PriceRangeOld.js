import React from 'react';
import { Range } from 'rc-slider';
// import 'rc-slider/assets/index.css';

const PriceRange = ( {initialRange, onChange}) => {

    const [valuesState, setValuesState] = React.useState(initialRange);

    const afterChangeRange = (values) => {
        setValuesState(values);
        onChange({
                    target:{
                        name: 'precio',
                        value: values
                    },
                });
    }

    const changeRange = (values) => {
        setValuesState(values);
    }

    return (
        <div style={{padding: 30}}>
            <Range
                step={10} 
                marks={{
                    0: {style:{color:'gray', width:100}, 
                    label: `Mín: ${valuesState[0]}`}, 
                    5000: {style:{color:'gray', width:100}, 
                    label: `Max: ${valuesState[1]}`},
                    2500: {style:{color:'lightgray', width:100}, 
                    label: `2500`},
                    1000: {style:{color:'lightgray', width:100}, 
                    label: `1000`},
                    4000: {style:{color:'lightgray', width:100}, 
                    label: `4000`}
                }} 
                style={{width:1000}} 
                value={valuesState} 
                min={0} 
                max={5000} 
                onAfterChange={afterChangeRange} 
                onChange={changeRange} 
                allowCross={false}
                // dots={true}
            />
        </div>
    )
}

export default PriceRange