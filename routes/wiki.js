const express = require('express');
const viewsIndex = require('../views/index');
const { Page, generateSlug } = require('../models/index')
const router = express.Router();




router.get('/', (req, res, next) => {
  //retrieve wiki pages
  res.send('<h1>retrieved wiki pages</h1>');
});

router.post('/', async (req, res, next) => {
  // submit new page
  const {name, email, title, content, status} = req.body;

  const page = new Page({
    title: title,
    content: content
  });

  try {
    await page.save();
    console.log('after save:', page);
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/add', (req, res, next) => {
  //retrieve add a page form
  res.send(viewsIndex.addPage());
});




module.exports = router;
