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
            posts.forEach(x =>{
                x.workingTitle = x.title,
                x.date = moment(x.createdAt).format('hh:mm:ss MM/DD/YYYY'),
                x.bodyShort = x.body.substring(0, 100)
            }
            );
            res.render('dashboard', {
                loggedIn: req.session.loggedIn,
                posts: posts,
                user: user.username,
            }
            );
        }
        else {
            res.status(200).json({ message: "no posts" });
        }
    }
    else {
        res.status(404).json({ message: 'not logged in' });
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
        else res.status(404).json({ message: 'no post with that id' });
    }
    res.status(404).json({ message: 'not logged in' });
});

module.exports = router;