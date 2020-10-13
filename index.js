process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require('cluster');
const { pbkdf2 } = require('crypto');

// Is the file being executed in master mode?
if (cluster.isMaster) {
  // Cause index.js to be executed "again" but
  // in child mode
  cluster.fork();
  // cluster.fork(); // uncomment to add more children
  // cluster.fork();
  // cluster.fork();
} else {
  // I'm a child, I'm going to act like a server
  // and do nothing else
  const express = require('express');
  const app = express();

  // block the event loop
  // function doWork(duration) {
  //   const start = Date.now();

  //   while (Date.now() - start < duration) {}
  // }

  app.get('/', (req, res) => {
    // doWork(5000);
    pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      res.send('Hi, Node.js');
    });
  });

  app.get('/fast', (req, res) => {
    res.send('In the fast route!');
  });

  app.listen(5000);
}
