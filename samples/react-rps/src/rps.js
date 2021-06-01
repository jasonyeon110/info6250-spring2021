// Logic about playing Rock, Paper, Scissors (aka roshambo)
// https://en.wikipedia.org/wiki/Rock_paper_scissors


const options = ['Paper', 'Scissors', 'Rock'];

function findPick(pick) {
  return options.findIndex( item => item === pick );
}

export function doesPlayer1Win(one, two) {
  const oneIs = findPick(one);
  const twoIs = findPick(two);
  const isPaperVsRock = (oneIs === 0) && (twoIs === 2);
  const isVsPrevious = oneIs === (twoIs+1);
  return isVsPrevious || isPaperVsRock;
}

export function randomPlay() {
  return options[Math.floor( Math.random() * options.length )];
}


