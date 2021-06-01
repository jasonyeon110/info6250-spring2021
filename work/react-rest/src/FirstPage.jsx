import React from 'react'

export default function FirstPage({ setShow, getFacts }) {

    return (
        <div>
            <button onClick={() => (setShow(true), getFacts())}>Load Facts</button>
        </div >
    )
}
