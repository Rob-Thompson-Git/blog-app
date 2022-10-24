const router = require('express').Router();
const {Post, User, Comment} = require('../models/');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

//need to make sure logged in
router.get('/', withAuth, async (req, res) => {
    try{
        const postData = await Post.findAll({
            where: {
                userId: req.session.userId
            }
        });
        const posts = postData.map((post) => post.get({plain: true}));
        res.render('all-posts', {
            layout: 'dashboard', 
            //adds posts
            posts
        });
    } catch(err) {
        //whenever res.redirect, we refer to view file
        // res.redirect('login');
        res.status(400).json(err);
    }
});

router.get('/new', withAuth, (req, res) => {
    res.render('new-post', {
        layout: 'dashboard'
    })
});

router.get('/edit/:id', withAuth, async (req, res)=> {
    try {
        const postData = await Post.findByPk(req.params.id);
        if(postData){
            const post = postData.get({plain: true})
            res.render('edit-post', {
                layout: 'dashboard',
                //brings post:id
                post
            })
        } else{
            res.status(404).end();
        }

    } catch(err) {
        res.redirect('login');
    }
});

module.exports = router;