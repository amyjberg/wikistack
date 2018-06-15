const express = require('express');
const viewsIndex = require('../views/index');
const { Page, generateSlug } = require('../models/index')
const router = express.Router();




router.get('/', async (req, res, next) => {
  //retrieve wiki pages
  const allPages = await Page.findAll();
  console.log('all pages', allPages)

  res.send(viewsIndex.main(allPages));
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
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get('/add', (req, res, next) => {
  //retrieve add a page form
  res.send(viewsIndex.addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {slug: req.params.slug}
    })
    console.log(page);
    res.send(viewsIndex.wikiPage(page));
    // res.json(page);
  } catch (error) {
    next(error)
  }

  // res.send(`hit dynamic route at ${req.params.slug}`);
});

module.exports = router;
