const express = require('express');
const app = express();
const PORT = 3000;

let catFans = [];

app.use(express.static('./public'));

app.post('/response', express.urlencoded({ extended: false }), (req, res) => {
  if(req.body.username === "dog") {
    res.send(`you drool`);
  } else {
    catFans.push(req.body.username);

    res.send(`
    <!doctype html>
    <html>
    <head></head>
    <body>
      <p>${ catFans.join(', ')} are all Cat fans so far</p>
      <a href="/">Return to form</a>
      <div>
        ${JSON.stringify(req.body)}
      </div>
    </body>
    </html>
  `);
  }
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
