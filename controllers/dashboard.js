const router = require('express').Router();
const moment = require('moment');
const { Posts, Comments, Users } = require('../models');

router.get('', async (req, res) => {
    //Return all users posts
    if (req.session && req.session.loggedIn) {
        const posts = await Posts.findAll({
            where: {
                user: req.session.user
            }
        });
        const user = await Users.findOne({ where: { id: req.session.user } });
        if (posts) {
            const postToShow = posts.map(item => {
                return {
                    title: item.title,
                    date: moment(item.createdAt).format('hh:mm:ss MM/DD/YYYY'),
                    body: item.body.substring(0, 100),
                    id: item.id,
                }
            }
            );
            res.render('dashboard', {
                loggedIn: req.session.loggedIn,
                posts: postToShow,
                user: user.username,
            }
            );
        }
        else {
            res.status(200).json({ message: "no posts" });
        }
    }
    else {
        res.redirect('/Login');
    }
});

router.get('/:id', async (req, res) => {
    //Get specific post for update or delete and show comments
    if (req.session && req.session.loggedIn) {
        const post = await Posts.findOne({
            where: {
                user: req.session.user
            },
            include: [
                { model: Comments }
            ]
        })
        if (posts) {
            res.render('dashboard-single', req.session.loggedIn, post);
        }
        else {
            res.render("badpage", {
                loggedIn: req.session.loggedIn,
                message: 'no post with that id'
            });
        }
    }
    else {
        res.redirect('/Login');
    }
});

router.get('/update/:id', async (req, res) => {
    if (req.session && req.session.loggedIn) {
        const post = await Posts.findOne({
            where: {
                id: req.params.id,
                user: req.session.user
            }
        });
        if (post) {
            res.render('createPost', {
                loggedIn: req.session.loggedIn,
                title: post.title,
                content: post.body,
                id:post.id,
                update:true,
            })
        }
        else {
            res.render("badpage", {
                loggedIn: req.session.loggedIn,
                message: 'The post does not exist or it is not your post'
            });
        }
    }
    else res.redirect('/Login');
});

module.exports = router;