const { Posts } = require('../models');

const posts = [
    {
        title: 'ReactApp',
        user: 2,
        body: 'ReactApp is a great way to start a web development project and have powerful tools at your fingertips',
    },
    {
        title: 'Stack Overflow',
        user: 3,
        body: 'One of if not the best website to go to for questions or answers as a programmer is stack overflow. It has helped me almost everytime when I have problems. More often then not you can find the answer to the question you have already posted because someone else had that same question before. The only issue is sometimes those questions where asked so long ago the answer is no longer the same as it was. However, the starting point for where to look can still be helpful from reading the previous answers.',
    },
    {
        title: 'VR Headsets',
        user: 2,
        body: 'I have been looking for a good VR headset for a long time and wanted to put some research into one location. I am looking at the Valve Index, HTV Vive 2, and Occulus Rift.',
    },
    {
        title: 'Testing out my new comment features',
        user: 4,
        body: 'Please leave a comment here so the devs can have some user data on comments. One per person please.',
    },
]

const seedPosts = async () => {
    await Posts.bulkCreate(posts);
};

module.exports = seedPosts;