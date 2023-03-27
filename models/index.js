const Posts = require("./posts");
const Users = require('./users');
const Comments = require('./comments');

Users.belongsTo(Posts, {
    foreignKey:'user'
})

Posts.hasMany(Users, {
    foreignKey:'id',
    onDelete:'CASCADE'
})

Users.belongsTo(Comments,{
    foreignKey:'user'
})

Comments.hasMany(Users,{
    foreignKey:'id'
})

Posts.belongsTo(Comments,{
    foreignKey:'post'
})

Comments.hasMany(Posts,{
    foreignKey:'id'
})


module.exports = {Posts, Users, Comments};