const PORT = 1337;
const express = require('express');
const app = express();

let controls = {
  timer: {
    defaultDuration: 10*60,
  },
};

const setTimer = (secondsToCount) => {
  const startTime = Math.floor(Date.now()/1000);
  controls.timer.endAt = startTime + (+secondsToCount || controls.timer.defaultDuration);
};

app.use(express.static('./public'));
app.use(express.json());

app.get('/api/controls', (req, res) => {
  res.json(controls);
});

app.post('/api/controls/timer',  (req, res) => {
  setTimer(req.body.timer);
  res.json(controls);
});


app.listen(PORT, () => console.log(`http://localhost:${PORT}/`) );
