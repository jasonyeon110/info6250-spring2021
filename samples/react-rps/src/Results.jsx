import { doesPlayer1Win } from './rps';

function Results({ player, computer }) {
  const playerWins = doesPlayer1Win(player, computer);
  const computerWins = doesPlayer1Win(computer, player);

  let result = 'Tie';
  if( playerWins ) {
    result = 'Win';
  } else if ( computerWins ) {
    result = 'Lose';
  }
  return (
    <div>
      <p>Player: {player} vs Computer: {computer}</p>
      <p>You {result}</p>
    </div>
  );
};
export default Results;
