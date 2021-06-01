const express = require('express');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');
const validate = require('./validate');
const { sessions } = require('./validate');
const users = require('./users');
const recipedetails = require('./recipedetail');

app.use(express.static('./public'));
app.use(cookieParser());

app.post('/session', express.json(), (req, res) => {
    const username = req.body.username;
    const errors = validate.validateUsername(username);
    if (errors) {
        res.status(400).json({ errors });
        return;
    };
    if (username === 'dog') {
        res.status(403).json({ errors: "Dog is not Allowed User" });
        return;
    };
    const sid = validate.createSession(username);
    res.cookie('sid', sid);
    users[sid] = { username };
    res.status(200).json(users[sid]);
});

app.get('/session', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'Login Required' });
        return;
    };
    if (validate.isValidSession(sid)) {
        res.status(200).json(users[sid]);
        return;
    };
    res.status(403).json({ error: 'Login-Invalid' });
});

app.delete('/session', (req, res) => {
    const sid = req.cookies.sid;
    delete users[sid];
    res.clearCookie('sid');
    res.status(200);
    return;
});

app.post('/recipe/:title', express.json(), (req, res) => {
    let makeRecipeId = Math.floor(Math.random(1) * 1000000);
    const title = req.params.title;
    const author = req.body.author;
    const ingredients = req.body.ingredients;
    const instruction = req.body.instruction;

    if (!title) {
        res.status(400).json({ error: "missing title" });
    }
    recipedetails.recipes[makeRecipeId] = {
        id: makeRecipeId.toString(),
        author,
        title,
        ingredients,
        instruction,
    }

    res.json(recipedetails.recipes);
});

app.get('/recipe', (req, res) => {
    res.json(recipedetails.recipes);
})

app.listen(PORT, () => console.log(`listening at localhost:${PORT}`));