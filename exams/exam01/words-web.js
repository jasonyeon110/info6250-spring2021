const words = require('./words');
const users = require('./users');

let savedUser = {};

const wordWeb = {

    guessPage: function (username, guessedWord, answer) {
        console.log(`guessPage username: ${username}`);
        const wordToGuess = users[username].answer;
        console.log(`guessPage answer: ${wordToGuess}`)
        return `
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <title>Guess the Word</title>
            <link rel="stylesheet" href="./words-web.css">
        </head>
        <body>
            <div class="whole-wrapper">
                <div class="logout">
                    <form action="/logout" method="POST"><button type="submit">Logout</button></form>
                </div>
                <div class="match-turn">
                    <span><label>Matched Letter Count: </lable>${this.correctGuessedLetters(username, guessedWord, answer)}</span>
                    <div> ${wordWeb.increaseTurnCount(username)}</div>
                </div>
                <h2>-Guess the Word-</h2>
                <div class="wrapper>
                    <input type="hidden" name="answer">
                        <div>
                        ${wordWeb.submitGuess(username, guessedWord, answer)}
                        </div>
                    </div>
                    <div class="wrong-answers-container">
                        <label class="wrong-label">Wrong Guessed Answers</label>
                        ${wordWeb.guessedWordsPost(username)}
                    </div>
                </div>
            </div>    
        </body>
        </html>
        `
    },

    submitGuess: function (username, blank, answer) {
        const setuser = username;
        const wordtoGuess = answer;
        console.log(`${setuser} and ${wordtoGuess}`)
        return `
        <form class="input-form" action="/word" method="POST">
            <input class="input-guess-text" type="text" name="guessedWord" placeholder="your guess?">
            <input type="hidden" name="username" value="${setuser}">
            <input type="hidden" name="wordtoGuess" value="${wordtoGuess}">
            <button type="submit">Try</buttom>
        </form>
        `
    },

    guessedWordsPost: function (username) {
        return ` <ul class="guessedWords">` +
            Object.values(users[username].guessedLists).map(word => `
            <li>
                <div class="word">
                    <span>${word}</span>
                </div>
            </li>
            `).join('') +
            `</ul>`;
    },

    correctGuessedLetters: function (username, guessedWord, answer) {
        const ans = users[username].answer;
        console.log(`From CorrectGUessedLetter function ${username}, GUESSED: ${guessedWord}, ANSWER: ${ans}`);
        let matches = 0;
        const letterCount = {};

        for (let letter of ans.toLowerCase()) {
            letterCount[letter] = letterCount + 1 || 1;
        }

        for (let letter of guessedWord.toLowerCase()) {
            if (letterCount[letter]) {
                letterCount[letter] -= 1;
                matches += 1;
            }
        }
        console.log(`This is letter Matched count: ${matches}`);
        return matches;
    },

    increaseTurnCount: function (username) {
        console.log(`from increaseTurnCOutn function:: ${users[username].turns}`);
        return `
        <span>Turns: ${users[username].turns}</span>
        `
    },
};

module.exports = wordWeb;