const cluster = require('cluster');

// Is the file being executed in master mode?
if (cluster.isMaster) {
  // Cause index.js to be executed "again" but
  // in child mode
  cluster.fork();
  // cluster.fork();
  // cluster.fork();
  // cluster.fork();
} else {
  // I'm a child, I'm going to act like a server
  // and do nothing else
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

  app.get('/fast', (req, res) => {
    res.send('In the fast route!');
  });

  app.listen(5000);
}
