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
        else {
            res.status(400).json({ message: 'failed to create' });
        }
    }
    else {
        res.redirect('/Login');
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
                const updateValues = {
                    body: req.body.body,
                    title: req.body.title,
                }
                await Posts.update(updateValues, {
                    where: {
                        id: req.params.id
                    }
                });
                res.status(200).json({ message: 'success' });
            }
            else {
                res.render("badpage", {
                    loggedIn: req.session.loggedIn,
                    message: 'post is not for this user'
                });
            }
        }
        else {
            res.render("badpage", {
                loggedIn: req.session.loggedIn,
                message: "post does not exist"
            });
            res.status(400).json({ message: "post does not exist" });
        }
    }
    else {
        res.redirect('/Login');
    }
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
            else {
                res.status(400).json({ message: 'failed to delete' });
            }
        }
        else {
            res.render("badpage", {
                loggedIn: req.session.loggedIn,
                message: 'unable to delete post'
            });
        }
    }
    else {
        res.redirect('/Login');
    }
})

router.post('/comment/:id', async (req, res)=>{   
    if(req.session && req.session.loggedIn){
        const comment = await Comments.create({
            comment:req.body.comment,
            post:req.params.id,
            user:req.session.user,
        })
        res.status(200).json({message:"success"});
    }
    else{
        res.redirect('/Login');
    }
});

module.exports = router;