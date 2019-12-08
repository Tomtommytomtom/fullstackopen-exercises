import React from 'react';

const CountryForm = ({name, value, onChange}) => {
    return (
        <div>
            {name}: <input
            value={value}
            onChange={onChange}
            />
        </div>
    );
};

export default CountryForm;