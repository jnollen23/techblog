const {Comments} = require('../models');

const comments = [
    {
        comment:'Awesome',
        post:1,
        user:1,
    },
    {
        comment:'Great work',
        post:2,
        user:1,
    },
    {
        comment:'So true',
        post:1,
        user:2,
    },
    {
        comment:'Never give up never surrender',
        post:1,
        user:3,
    },
    {
        comment:'We are spartans',
        post:3,
        user:2,
    },
    {
        comment:'This is a comment',
        post:4,
        user:3,
    },
    {
        comment:'Welcome comments',
        post:4,
        user:2,
    },
];


const seedComments = async () =>{
    await Comments.bulkCreate(comments);
};

module.exports = seedComments;