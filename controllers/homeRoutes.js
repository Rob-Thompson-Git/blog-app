const router = require('express').Router();
const { Comment, User, Post } = require('../models');


router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [User]
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // targets all-posts.handlebars and const posts
    res.render('all-posts', {posts});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });
  if(postData){
    const post = postData.get({ plain: true });
    res.render('single-post', {post});
  } else{
    res.status(404).end()
  }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

//Signup
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
