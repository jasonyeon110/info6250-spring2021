//https://stackoverflow.com/questions/48405643/reactjs-how-to-always-show-only-certain-number-of-array-items/48405784
import { useState, useEffect } from 'react';
import React from 'react'
import Dropdown from './Dropdown';

export default function Contents({ contents, setFactLabel }) {

    let [factNums, factNumbers] = useState(5);
    let [first, setFirst] = useState(0);
    let [second, setSecond] = useState(5);

    useEffect(() => {
        setFactLabel(`${factNums} Random Facts Loaded`)
    }, [factNums])

    function next() {
        if (second >= contents.length) {
            return;
        }
        if (factNums === 5) {
            setFirst(first += 5);
            setSecond(second += 5);
        }
        if (factNums === 10) {
            setFirst(first += 10);
            setSecond(second += 10);
        }
    }

    function previous() {

        if (first < 5) {
            return;
        }
        if (factNums === 5) {
            setFirst(first -= 5);
            setSecond(second -= 5);
        }
        if (factNums === 10) {
            setFirst(first -= 10);
            setSecond(second -= 10);
        }
    }

    let factPerPage = contents.slice(first, second);

    return (
        <div>
            <Dropdown factNumbers={factNumbers} setSecond={setSecond} />
            <p className="show-fact-label">Showing Random Facts {first + 1} - {second}</p>
            <ul>
                {factPerPage.map((content) => (
                    <li>
                        <span>{content.fact}</span>
                    </li>
                ))}
            </ul>
            <button onClick={previous}>Previous</button>
            <button onClick={next}>Next</button>
        </div>
    )
}
