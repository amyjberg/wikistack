const express = require('express');
const viewsIndex = require('../views/index');
const { Page, User, generateSlug } = require('../models/index')
const router = express.Router();




router.get('/', async (req, res, next) => {
  //retrieve wiki pages
  const allPages = await Page.findAll();
  res.send(viewsIndex.main(allPages));
});

router.post('/', async (req, res, next) => {
  // submit new page
  try {
    const {name, email, title, content, status} = req.body;
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: name,
        email: email
      }
    });

    const page = await Page.create(req.body);

    page.setAuthor(user);

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
    });
    const user = await page.getAuthor();

    res.send(viewsIndex.wikiPage(page, user));

  } catch (error) {
    next(error)
  }

  // res.send(`hit dynamic route at ${req.params.slug}`);
});

module.exports = router;
