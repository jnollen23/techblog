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
    foreignKey:'user',
    targetKey:'id'
})

Comments.hasMany(Users,{
    foreignKey:'user'
})

Posts.belongsTo(Comments,{
    foreignKey:'id'
})

Comments.hasMany(Posts,{
    foreignKey:'post'
})


module.exports = {Posts, Users, Comments};