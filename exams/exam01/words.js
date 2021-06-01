const { guessPage, guessedWords } = require("./words-web");

const wordsArray = ['have', 'info', 'with', 'aqua', 'zoom', 'snil', 'bird', 'pupp', 'jeep', 'mojo', 'that'];

function getRandomWord(wordsArray) {
  const pickNum = Math.floor(Math.random() * wordsArray.length);
  return words.wordsArray[pickNum].toLowerCase();
};

const words = {
  wordsArray,
  wordsArray,
  getRandomWord,
};

module.exports = words;