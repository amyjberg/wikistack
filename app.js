const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const layout = require('./views/layout');
const app = express();



app.use(morgan('dev'));
app.use(express.static(__dirname + 'public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res, next) => {
  res.send(layout(''));
});


const PORT = 3000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
