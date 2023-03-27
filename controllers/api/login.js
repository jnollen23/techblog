const router = require('express').Router();
const { Posts, Comments, Users } = require('../../models');

router.post('/', async (req, res) => {
    //user attempting to login
    const user = await Users.findOne({
        where: {
            username: req.body.username
        }
    });
    if (user) {
        if (await user.checkPassword(req.body.password)) {
            req.session.save(() => {
                req.session.loggedIn = true;
                req.session.user = user.id;
                res.status(200).json({ message: 'Success' });
            }
            );
        }
        else {
            res.status(401).json({ message: "Bad username or password" });
        }
    }
    else {
        res.status(401).json({ message: "Bad username or password" });
    }

});

router.post('/signup', async (req, res) => {
    //user attempting to sign up
    const user = await Users.create(req.body);
    if (user) {
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user = user.id;
            res.status(200).json({ message: 'Success' });
        })
    }
    else {
        res.status(401).json({ message: 'Unable to create user' });
    }
});

router.post('/logout', async (req, res) => {
    if (req.session) {
        req.session.destroy(() => {
            res.status(200).json({ message: "Success" });
        });
    }
    else {
        res.status(404).json({ message: "Not logged in" });
    }
});

module.exports = router;