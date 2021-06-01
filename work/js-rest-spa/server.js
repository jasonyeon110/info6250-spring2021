const express = require('express');
const app = express();
const PORT = 3000;
const uuidV4 = require('uuid').v4;
const inventory = require('./inventory');

app.use(express.static('./public'));
app.use(express.json());

app.get('/items', (req, res) => {
    res.json(Object.values(inventory.items));
});

app.get('/items/:itemid', (req, res) => {
    const itemId = req.params.itemid;
    if (inventory.items[itemId]) {
        res.json(inventory.items[itemId]);
    } else {
        res.status(404).json({ error: `Not registered Item: ${itemId}` });
    }
});

app.post('/items/:itemid', express.json(), (req, res) => {
    const rawItemName = req.params.itemid;

    const itemName = rawItemName.replace(/[^A-Za-z0-9_ ]/g, '');

    if (!itemName) {
        res.status(400).json({ error: 'Missing ItemID' });
        return;
    }
    if (inventory.checkExist(itemName)) {
        res.status(409).json({ error: 'Duplicated Item' });
        return;
    }
    const sid = uuidV4();
    inventory.items[sid] = {
        itemId: sid,
        name: itemName,
        quantity: 0,
    };
    res.json(Object.values(inventory.items));
});

app.delete('/items/:itemid', (req, res) => {
    const item = req.params.itemid;

    if (!item) {
        res.status(400).json({ error: 'Missing Item' });
        return;
    }
    delete inventory.items[item];
    res.json(Object.values(inventory.items));
});

app.patch('/add/:itemid', express.json(), (req, res) => {
    const itemId = req.params.itemid;
    if (!itemId) {
        res.status(400).json({ error: 'Missing ItemID' });
        return;
    }
    inventory.items[itemId].quantity += 1;
    res.json(Object.values(inventory.items));
});

app.patch('/sub/:itemid', express.json(), (req, res) => {
    const itemId = req.params.itemid;
    if (!itemId) {
        res.status(400).json({ error: 'Missing ItemID' });
        return;
    }
    if (inventory.items[itemId].quantity > 0) {
        inventory.items[itemId].quantity -= 1;
    }

    res.json(Object.values(inventory.items));
})

app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`));