process.env.UV_THREADPOOL_SIZE = 1;
const { pbkdf2 } = require('crypto');

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    res.send('Hi, Node.js');
  });
});

app.get('/fast', (req, res) => {
  res.send('In the fast route!');
});

app.listen(5000);
