const express = require('express');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');
const uuidv4 = require('uuid').v4;

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./public'));

// This could move to another file for Separation of Concerns
const session = {};

app.get('/', (req, res) => {
  const sid = req.cookies.sid;
  if(!sid || !session[sid]) {
    res.send('You are not logged in, <a href="/login.html">Login Now</a>');
    return;
  }

  res.send(`
    You are logged in as ${session[sid].username}.
    You may <form action="/logout" method="POST"><button type="submit">Logout</button></form>
  `);
});


// Note: our static login form is in /public, but if it were dynamic
// we would define it here instead
app.post('/session', (req, res) => {
  const rawUsername = req.body.username.trim();
  // Sanitize inputs
  // removes any not-allowed character
  const username = rawUsername.replace(/[^A-Za-z0-9_]/g, '');

  if(username === 'dog' || !username){
    res.status(403).send('this is a bad message');
    return;
  }
  const sid = uuidv4();
  res.cookie('sid', sid);
  session[sid] = {
    username,
  };
  res.redirect('/');
});

app.post('/logout', (req, res) => {
  const sid = req.cookies.sid;
  delete session[sid];
  res.clearCookie('sid');
  res.redirect('/');
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

