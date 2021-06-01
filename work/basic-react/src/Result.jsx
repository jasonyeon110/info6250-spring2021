import React from 'react';
import { output } from './word';

// const secretWord = "recat";

export default function Result({ word }) {

    let result = output(word);

    return (
        <div className="result">
            <p>This is Your Input: <strong >{word}</strong></p>
            <p>{result}</p>
        </div>
    )
}
