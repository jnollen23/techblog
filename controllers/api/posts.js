const router = require('express').Router();
const { Posts, Comments, Users } = require('../../models');

router.get('/', async (req, res) => {
    //Return all posts
    const posts = await Posts.findAll();
    res.status(200).json(posts);
});

router.get('/:id', async (req, res) => {
    //Get specific post and comments
    const post = await Posts.findOne({
        where: {
            id: req.params.id
        },
        include: [
            { model: Comments }
        ]
    });
    if (post) {
        res.render("content", { loggedIn: req.session.loggedIn, post: post });
    }
});

router.post('/', async (req, res) => {
    if (req.session && req.session.loggedIn) {
        const post = await Posts.create({
            user: req.session.user,
            title: req.body.title,
            body: req.body.body,
        })
        if (post) {
            res.status(200).json({ message: 'success' });
        }
        else res.status(400).json({ message: 'failed to create' });
    }
    else {
        res.status(404).json({ message: 'not logged in' });
    }
});

router.put('/:id', async (req, res) => {
    if (req.session && req.session.loggedIn) {
        const post = await Posts.findOne({
            where: {
                id: req.params.id
            }
        })
        if (post) {
            if (post.user === req.session.user) {
                post.body = req.body.body;
                post.title = req.body.title;
                await Posts.update(post, {
                    where: {
                        id: req.params.id
                    }
                });
                res.status(200).json(post);
            }
            else {
                res.status(400).json({ message: 'post is not for this user' })
            }
        }
        else {
            res.status(400).json({ message: "post does not exist" });
        }
    }
    res.status(400).json({ message: 'Not logged in' });
})

router.delete('/:id', async (req, res) => {
    if (req.session && req.session.loggedIn) {
        const user = await Posts.findOne({
            where: {
                id: req.params.id,
                user: req.session.user
            }
        });
        if (user) {
            const post = await Posts.destroy({ where: { id: req.params.id, user: req.session.user } });
            if (post) {
                res.status(200).json({ message: 'success' });
            }
            else res.status(400).json({ message: 'failed to delete' });
        }
        else {
            res.status(400).json({ message: 'unable to delete post' });
        }
    }
    else {
        res.status(400).json({ message: 'not logged in' });
    }
})

module.exports = router;