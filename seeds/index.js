require('dotenv').config();

const sequelize = require('../config/config');
const {Posts, Users, Comments} = require('../models');
const seedP = require('./posts');
const seedU = require('./users');
const seedC = require('./comments');

const seeds = async ()=>{
    await sequelize.sync({force:true});
    //Add bulk create lines or methods for each database
    await seedU();
    await seedP();
    await seedC();
}

seeds();