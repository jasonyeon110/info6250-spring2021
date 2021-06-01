// import { handleAddWord } from './word';

function Play({ setWord, input, setValue }) {

    function updateWord(e) {
        e.preventDefault();
        setWord(input);
        setValue('');
    }

    function handleInput(e) {
        setValue(e.target.value);
    };

    return (
        <div className="play">
            <h2>Please Enter <strong> <em>ONLY</em> </strong>5 characters word</h2>
            <form className="form">
                <label id="word-label">Enter 5 Letter word:</label>
                <input type="text" value={input} id="guessed-word" onChange={handleInput} />
                <button onClick={updateWord}>Submit</button>
            </form>
        </div>
    )
};

export default Play;