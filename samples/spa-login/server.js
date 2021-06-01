const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid').v4;
const app = express();
const PORT = 3000;

app.use(express.static('./public'));
app.use(cookieParser());

// TODO: all this session code should move to another file
const sessions = {};
const isValidSession = function (sid) {
  return sessions[sid];
};
const validateUsername = function (username) {
  const errors = [];
  const clean = username.replace(/[^A-Za-z0-9_]+/g, '');
  if (clean !== username) {
    // TODO: should give error codes, not text messages
    errors.push('username contained disallowed characters');
  }
  if (!username) {
    errors.push('username was empty');
  }

  return errors.lengths ? errors : '';
};
const createSession = function (username) {
  const sid = uuid();
  sessions[sid] = {
    username,
    todos: [
      {
        task: 'have a real list',
        done: false,
      },
    ],
  };
  return sid;
};


app.get('/session', (req, res) => {
  // check cookie from request
  const sid = req.cookies.sid;
  if (!sid) {
    res.status(401).json({ error: 'login-required' });
    return;
  }
  if (isValidSession(sid)) {
    res.status(200).json(sessions[sid]);
    return;
  }

  res.status(403).json({ error: 'login-invalid' });
});

app.post('/session', express.json(), (req, res) => {
  const { username } = req.body;
  const errors = validateUsername(username);
  if (errors) {
    res.status(400).json({ errors });
    return;
  }
  const sid = createSession(username);
  res.cookie('sid', sid);
  res.status(200).json(sessions[sid]);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));