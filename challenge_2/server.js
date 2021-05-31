const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const port = 3000;
const path = require('path');
const distPath = `${__dirname}/public`;

app.use(express.static(distPath));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  console.log('hi: ', path.join(distPath, 'index.html'))
  res.sendFile(path.join(distPath, 'index.html'));
})

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
})