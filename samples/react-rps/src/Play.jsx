function Play({ setPlayer }) {
  return (
    <div>
      <button onClick={ () => setPlayer('Rock') }>Rock</button>
      <button onClick={ () => setPlayer('Paper') }>Paper</button>
      <button onClick={ () => setPlayer('Scissors') }>Scissors</button>
    </div>
  );
};
export default Play;
