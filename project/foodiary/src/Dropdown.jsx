import React from 'react'

export default function Dropdown({ value }) {

    const handleOnClick = (e) => {
        const num = parseInt(e.target.value);
        console.log(`Dropdown rating number => ${num}`);
        value = num;
    }


    return (
        <div className="dropdown">
            <select onChange={handleOnClick}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
    )
}
