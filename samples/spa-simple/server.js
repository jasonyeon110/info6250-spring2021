const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('./public'));

// Note: A good application would have this model logic in a separate file(s)
const people = {
  amit: {
    age: 23,
    grade: 76,
  },
  bao: {
    age: 24,
    grade: 92,
  },
};

app.get('/people/:name', (req, res) => {
  const name = req.params.name;
  if (people[name]) {
    res.json(people[name]);
  } else {
    res.status(404).json({ error: `Unknown user: ${name}` });
  }
});

app.get('/people/', (req, res) => {
  res.json(Object.keys(people));
});

app.post('/people/:name', express.json(), (req, res) => {
  const name = req.params.name;
  // TODO: Should sanitize user input here before saving!
  if (!name) {
    res.status(400).json({ error: 'missing-name' });
    return;
  }
  if (people[name]) {
    res.status(409).json({ error: 'duplicate' });
    return;
  }
  const { age, grade } = req.body; // pull only expected fields from data
  // The below is assigning to the name,
  // but real services may use some form of id field
  people[name] = { // TODO: this should filter these values against expected input!
    age,
    grade,
  };
  // The below could instead return the new data item or id, particularly if a new id was created
  // otherwise the caller will not know which record was the one this call created!
  res.json(Object.keys(people)); // returning the new list of names
});

app.delete('/people/:name', (req, res) => {
  const name = req.params.name;
  if (!name) {
    res.status(400).json({ error: 'missing-name' });
    return;
  }
  delete people[name];
  res.json(Object.keys(people));
});

app.listen(3000, () => console.log(`http://localhost:${PORT}`));
