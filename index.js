const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello world from the cluster!');
})

app.listen(3000, function () {
  console.log('Starting hello-world server...');
})
