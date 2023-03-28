const router = require('express').Router();
const moment = require('moment');
const { Posts, Comments, Users } = require('../models');

router.get('/Posts/:id', async (req, res) => {
    //Get specific post and comments
    try {
        const post = await Posts.findOne({
            where: {
                id: req.params.id,
            }
        });
        const comments = await Comments.findAll({
            where: {
                post: req.params.id
            },
            include: [
                {
                    model: Users,
                }
            ]
        })
        const postToShow = {
            title: post.title,
            body: post.body.substring(0, 100),
            date: moment(post.createdAt).format("hh:mm:ss MM/DD/YYYY"),
            id: post.id,
        };
        const commentsToShow = comments.map(comment => {
            return {
                body: comment.comment,
                user: comment.users[0].username,
                date: moment(comment.createdAt).format('hh:mm:ss MM/DD/YYYY'),
            }
        })
        res.render('content', {
            post: postToShow,
            loggedIn: req.session.loggedIn,
            comments: commentsToShow,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/Login', async (req, res) => {
    //Show login page
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
    }
    else {
        res.render('login');
    }
});

router.get('/Signup', async (req, res) => {
    //show signup page
    if (req.sessionStore.loggedIn) {
        res.redirect('/dashboard');
    }
    else {
        res.render('signup');
    }
});

router.get('/Logout', async (req, res) => {
    if (req.session.loggedIn)
        req.session.destroy();

    res.redirect('/Home');
})

router.get('/CreatePost', (req, res) => {
    if (req.session && req.session.loggedIn) {
        res.render('createPost', {
            loggedIn: req.session.loggedIn,
        });
    }
    else res.status(400).json({ message: 'not logged in' });
});

router.get('/Home', async (req, res) => {
    //Return all posts
    try {
        const posts = await Posts.findAll();
        const postsToShow = posts.map(post => {
            return {
                title: post.title,
                body: post.body.substring(0, 100),
                date: moment(post.createdAt).format("hh:mm:ss MM/DD/YYYY"),
                id: post.id,
            }
        });
        res.render('home', { posts: postsToShow, loggedIn: req.session.loggedIn });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('', async (req, res) => {
    //Return all posts
    try {
        const posts = await Posts.findAll();
        const postsToShow = posts.map(post => {
            return {
                title: post.title,
                body: post.body.substring(0, 100),
                date: moment(post.createdAt).format("hh:mm:ss MM/DD/YYYY"),
                id: post.id,
            }
        });
        res.render('home', { posts: postsToShow, loggedIn: req.session.loggedIn });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;