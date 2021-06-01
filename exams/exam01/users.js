const words = require('./words');

const users = {
    "jason": {
        userId: 'yeonj',
        username: 'jason',
        turns: 0,
        guessedLists: [],
        answer: words.getRandomWord(words.wordsArray),
        isWon: false
    },
    "yuri": {
        userId: 'yuri777',
        username: 'yuri',
        turns: 0,
        guessedLists: [],
        answer: words.getRandomWord(words.wordsArray),
        isWon: false
    },

    userLogoutCLear: function () {
        users['jason'].turns = 0;
        users['jason'].guessedLists = [];
        users['yuri'].turns = 0;
        users['yuri'].guessedLists = [];
    }
};

module.exports = users;