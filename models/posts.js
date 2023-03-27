const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Posts extends Model {}

Posts.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        user:{
            type:DataTypes.INTEGER,
            allowNull: false,
            references:{
                model:'users',
                key:'id'
            }
        },
        body:{
            type:DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'posts',
    }
)

module.exports = Posts;