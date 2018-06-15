const express = require('express');
const viewsIndex = require('../views/index');
const router = express.Router();


router.get('/', (req, res, next) => {
  //retrieve wiki pages
  res.send('<h1>retrieved wiki pages</h1>');
});

router.post('/', (req, res, next) => {
  // submit new page
  // does it work?
  const {name, email, title, content, status} = req.body;

  console.log(req.body);
  res.send('<h1>submitted new page</h1>');
});

router.get('/add', (req, res, next) => {
  //retrieve add a page form
  res.send(viewsIndex.addPage());
});




module.exports = router;
