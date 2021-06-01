import React from 'react';
import loading from './logo192.png';

export default function Loading({ contentsState }) {
    let content = null;
    if (contentsState.isLoading) {
        // if (!true) {
        content =
            <div>
                <div className="loading">Loading...</div>
                <img src={loading} alt="" className="spinner" />
            </div>
    }

    return (
        <div>
            {content}
        </div>
    )
}
