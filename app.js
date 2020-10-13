const express = require('express');
const Worker = require('web-worker');

const app = express();

app.get('/', (req, res) => {
  const worker = new Worker(__filename, function () {
    this.onmessage = function () {
      let counter = 0;
      while (counter < 1e9) {
        counter++;
      }

      postMessage(counter);
    };
  });

  worker.onmessage = function (message) {
    console.log(message.data);
    res.send('' + message.data);
  };

  worker.postMessage();
});

app.get('/fast', (req, res) => {
  res.send('In the fast route!');
});

app.listen(5000);
