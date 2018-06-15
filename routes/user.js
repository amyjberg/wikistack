const express = require('express');
const viewsIndex = require('../views/index');
const { Page, User } = require('../models/index');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const allAuthors = await User.findAll();
    res.send(viewsIndex.userList(allAuthors));
  } catch (error) {
    next(error)
  }

});

router.get('/:id', async (req, res, next) => {
  try {
    const authorId = req.params.id;

    const user = await User.findById(authorId);

    const postsByAuthor = await Page.findAll({
      where: {authorId : authorId}
    });

    res.send(viewsIndex.userPages(user, postsByAuthor));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
