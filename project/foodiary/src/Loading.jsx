import React from 'react';
import loading from './logo192.png';
// import loading from './loader-2_food.gif';

export default function Loading() {

    return (
        <div className="loading-container">
            <div className="loading">Loading...</div>
            <img src={loading} alt="" className="spinner" />
        </div>
    )
}
