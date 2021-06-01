const express = require('express');
const app = express();
const PORT = 5000;
const facts = require('./facts');

app.use(express.static('./build'));

app.get('/api/test', (req, res) => {
    res.send('Server is working');
});

app.get('/api/facts', (req, res) => {
    setTimeout(() => {
        res.json(facts)
    }, 3000);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}/`));