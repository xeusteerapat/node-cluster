const express = require('express');
const app = express();

// block the event loop
function doWork(duration) {
  const start = Date.now();

  while (Date.now() - start < duration) {}
}

app.get('/', (req, res) => {
  doWork(5000);
  res.send('Hi, Node.js');
});

app.listen(5000);
