const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const layout = require('./views/layout');
const app = express();
const models = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

models.db.authenticate().
then(() => {
  console.log('connected to the database');
})

app.use(morgan('dev'));
app.use(express.static(__dirname + 'public'));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

app.get('/', async (req, res, next) => {
  // res.send(layout(''));
  res.redirect('/wiki');
});

const init = async () => {
  await models.db.sync({force: false});
  // await models.User.sync();

  const PORT = 3000
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

init();

