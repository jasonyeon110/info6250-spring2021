const express = require('express');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');
const uuidV4 = require('uuid').v4;
const wordWeb = require('./words-web');
const users = require('./users');
const words = require('./words');

const session = {};

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./public'));

app.get('/check', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid || !session[sid]) {
        res.send(`You are Not Logged in, <a href="/index.html">To LogIn</a>`);
        return;
    }
    const username = session[sid].username;
    const answer = users[session[sid].username].answer;
    console.log(`logged in as ${username} answer is ${answer}`);
    res.send(wordWeb.guessPage(username, answer));
});

app.post('/session', (req, res) => {
    const username = req.body.username.trim();
    console.log(username);
    if (!username || !users.hasOwnProperty(`${username}`)) {
        console.log('No input or wrong user ID');
        res.status(403).send(`Not Authorized UserID <a href="/index.html">To LogIn</a>`);
        return;
    }
    const sid = uuidV4();
    res.cookie('sid', sid);
    console.log(sid);
    session[sid] = {
        username,
    };
    console.log(session[sid]);
    res.redirect('/check');
});

app.post('/word', express.urlencoded({ extended: false }), (req, res) => {
    let guessedWord = req.body.guessedWord;
    const username = req.body.username;
    const answer = users[username].answer;
    console.log(`from app.post /word guessed word = ${guessedWord} and user name is ${username} and answer is ${answer}`);
    console.log(users[username].guessedLists);
    if (!guessedWord) {
        delete req.body.guessedWord;
        console.log(`~~~~~~~~~~~~~~~~~~~~~~~No input ${guessedWord}`);
        res.send(wordWeb.guessPage(username, guessedWord, answer));
    } else if (guessedWord === answer) {
        console.log("correct");
        users[username].isWon = true;
        res.redirect('/winning');
    } else {
        console.log('wrong');
        users[username].guessedLists.push(guessedWord);
        delete req.body.guessedWord;
        users[username].turns += 1;
        console.log(`TURNS: ${users[username].turns} and ANSWER: ${answer} and GUESSED: ${guessedWord}`);
        res.send(wordWeb.guessPage(username, guessedWord, answer));
    }
});

app.get('/winning', (req, res) => {
    res.send(`
    <link rel="stylesheet" href="./words-web.css">
    <div class="winning-page">
        <p>You have won the game~~! 
        Would you Like to to restart? 
        </p>
        <form class="form-logout" action="/logout" method="POST">
            <button type="submit">Logout and Signin Again</button>
        </form>
    </div>
    `);
})

app.post('/logout', (req, res) => {
    users.userLogoutCLear();
    const sid = req.cookies.sid;
    delete session[sid];
    res.clearCookie('sid');
    console.log('Logging out');
    res.redirect('/check');
});

app.listen(PORT, () => console.log(`Listening on "localhost:${PORT}"`));