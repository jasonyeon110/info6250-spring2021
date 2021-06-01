import React from 'react'

export default function PlayAgain({ onReset }) {
    return (
        <div className="play-again">
            <button onClick={onReset}>Play Again?</button>
        </div>
    )
}
