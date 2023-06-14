import React from 'react';
import AsyncSelect from 'react-select/async';
import axios from 'axios';

const Autocomplete = (props) => {
    const promiseOptions = async (inputValue) => {
    inputValue = inputValue.trim();
    const length = inputValue.length;

    if (length <= 1) {
        return [];
    }

try {
    const response = await axios.get(`http://localhost:3000/all.php?query=${inputValue}`);
    const data = response.data;
    const filteredData = data
        .filter((user) => {
            const name = user.name.toLowerCase();
            const query = inputValue.toLowerCase();
            return name.includes(query);
        })
        .map((user) => ({
            value: user.id,
            label: user.name,
    }));

    // Log the filteredData response
    console.log(filteredData);

    return filteredData;
    } catch (error) {
    console.error('Error fetching options:', error);
    return [];
    }
};

    const onSelectUsers = (data) => {
        console.log(data);
    };
    

    return (
        <div style={{ width: '500px', margin: '10px 650px 10px 650px'  }}> 
            <AsyncSelect
                isMulti
                minLength={1}
                cacheOptions
                defaultOptions
                loadOptions={promiseOptions}
                classNamePrefix="react-select"
                onChange={onSelectUsers}
            />
        </div>
    );
};

export default Autocomplete;
