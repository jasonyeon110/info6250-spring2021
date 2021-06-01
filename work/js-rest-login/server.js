const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid').v4;
const app = express();
const PORT = 3000;
const validate = require('./validate');

app.use(express.static('./public'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get('/session', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'login required' });
        return;
    }
    if (validate.isValidSession(sid)) {
        res.status(200).json(validate.sessions[sid]);
        return;
    }
    res.status(403).json({ error: 'login-invalid' });
});

app.get('/item-lists/:username', express.json(), (req, res) => {
    const username = req.params.username;
    res.status(200).json(validate.sessions[username].items);
})

app.post('/session', express.json(), (req, res) => {
    const { username } = req.body;
    const errors = validate.validateUsername(username);
    if (errors) {
        res.status(400).json({ errors });
        return;
    }

    const sid = validate.createSession(username);
    res.cookie('sid', sid);
    res.status(200).json(validate.sessions[sid]);
});

app.post('/item/:itemName', express.json(), (req, res) => {
    let itemName = req.params.itemName;
    const username = req.body.username;

    if (!itemName) {
        res.status(400).json({ error: 'Missing ItemID' });
        return;
    }

    const strItem = itemName.toString();
    itemName = { name: itemName, rating: 1 };

    validate.sessions[username].items[strItem] = itemName;

    res.json(Object.values(validate.sessions[username].items));
});

app.delete(`/items-list/:itemName`, express.json(), (req, res) => {

    let itemName = req.params.itemName;
    const username = req.body.username;

    if (!itemName) {
        res.status(400).json({ error: 'Missing ItemID' });
        return;
    }

    const strItem = itemName.toString();

    delete validate.sessions[username].items[strItem];
    res.json(Object.values(validate.sessions[username].items));
});

app.patch(`/items-list/rating/:itemName`, express.json(), (req, res) => {
    let itemName = req.params.itemName;
    const username = req.body.username;

    if (!itemName) {
        res.status(400).json({ error: 'Missing ItemID' });
        return;
    }
    const strItem = itemName.toString();

    if (validate.sessions[username].items[strItem].rating < 5) {
        validate.sessions[username].items[strItem].rating += 1;
    }
    res.json(Object.values(validate.sessions[username].items));
});

app.patch(`/items-list/rating-d/:itemName`, express.json(), (req, res) => {

    let itemName = req.params.itemName;
    const username = req.body.username;

    if (!itemName) {
        res.status(400).json({ error: 'Missing ItemID' });
        return;
    }

    const strItem = itemName.toString();

    if (validate.sessions[username].items[strItem].rating > 0) {
        validate.sessions[username].items[strItem].rating -= 1;
    }
    res.json(Object.values(validate.sessions[username].items));
});

app.listen(PORT, () => console.log(`Listening at localhost:${PORT}`));