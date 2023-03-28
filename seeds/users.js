const { Users } = require('../models');

const users = [
    {
        username: 'ZiggyD',
        email:'ziggyd@gmail.com',
        password:'123456789',
    },
    {
        username: 'cohhcarnage',
        email:'cohh@carnage.net',
        password:'goddammit',
    },
    {
        username: 'sway_bae',
        email:'swayb@gmail.com',
        password:'hearthstone',
    },
    {
        username: 'itsHafu',
        email:'hafu@gmail.com',
        password:'snuggles',
    },
    {
        username: 'quin69',
        email:'quin69@69.com',
        password:'dogtamer',
    },
];

const seedUsers = async () => {
    await Users.bulkCreate(users);
};

module.exports = seedUsers;
