require('dotenv').config();

const sequelize = require('../config/config');
const {Posts, Users, Comments} = require('../models');

const seeds = async ()=>{
    await sequelize.sync({force:true});
    //Add bulk create lines or methods for each database
}

seeds();