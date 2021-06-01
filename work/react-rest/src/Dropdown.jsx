import React, { useState } from 'react';

export default function Dropdown({ factNumbers, setSecond }) {

    function handleOnClick(e) {
        const num = parseInt(e.target.value);
        console.log(`number => ${num}`)
        factNumbers(num);
        setSecond(num);
    };



    return (
        <div className="dropdown">
            <label>Facts per Page</label>
            <select onChange={handleOnClick}>
                <option value="5">5</option>
                <option value="10">10</option>
            </select>
        </div>
    )
}
