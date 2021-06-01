const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 5000;
const session = require('./session');

app.use(cookieParser());
app.use(express.json());
app.use(express.static('./build'));

app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ error: 'session-required' });
        return;
    }
    if (!session.isValid(sid)) {
        res.status(403).json({ error: 'session-invalid' });
        return;
    }
    res.json(session.details[sid]);
});

app.post('/api/session', (req, res) => {
    const username = req.body.username;
    const { sid, error } = session.create({ username });
    setTimeout(() => {
        if (error) {
            return res.status(400).json(error);
        }
        res.cookie('sid', sid);
        res.json(session.details[sid]);
    }, 3000);
});

app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    session.remove(sid);
    setTimeout(() => {
        res.clearCookie('sid');
        res.json({ sid, status: 'removed' });
    }, 3000)
});

app.post(`/api/review/`, (req, res) => {
    const { name, rating, review } = req.body;
    const sid = req.cookies.sid;
    const id = Math.floor(Math.random() * 1000000);

    console.log(`sid number => ${JSON.stringify(sid)}`)
    console.log(`${name},${rating},${review}`)
    // setTimeout(() => {
    if (!name || !rating || !review) {
        return res.status(400).json({ error: "No Blank Fields..." });
    }
    console.log(`${JSON.stringify(session.details[sid].info)}`);
    session.details[sid].info[name] = {
        id,
        name,
        rating,
        review,
    }
    console.log(`input added to the lists? => ${JSON.stringify(session.details[sid])}`)
    return res.json(session.details[sid]);
    // }, 1000);
})

app.delete(`/api/reviews/:name`, (req, res) => {
    const name = req.params.name;
    const sid = req.cookies.sid;
    console.log(sid);
    setTimeout(() => {
        if (!name) {
            return res.status(400).json({ error: "Missing Review" });
        }
        console.log(`${JSON.stringify(session.details[sid].info[name])}`)
        delete session.details[sid].info[name];
        console.log(`whatever sending back after delete the item => ${JSON.stringify(session.details[sid])}`)
        return res.json(session.details[sid].info);
    }, 1000);
})

app.get('/api/secret', (req, res) => {
    return res.json(session.details);
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));