const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Comments extends Model {}

Comments.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        comment:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        post:{
            type:DataTypes.INTEGER,
            allowNull: false,
            references:{
                model:'posts',
                key:'id'
            }
        },
        user:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:"users",
                key:"id"
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comments',
    }
)

module.exports = Comments;