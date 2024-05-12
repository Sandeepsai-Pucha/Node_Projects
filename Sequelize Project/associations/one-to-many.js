// hasMany and BelongsTo Relationship

const Sequelize = require('sequelize')

const {DataTypes, Op} = Sequelize 

const sequelize = new Sequelize('mydb', 'root', 'Sandeepsai@204', {
    dialect: 'mysql'
})

const User = sequelize.define('user', {
    userName: {
        type: DataTypes.STRING,
        },
    password: {
        type: DataTypes.STRING
        }
    }, {
        timestamps : false
    }
);

const Post = sequelize.define('post', {
    message: {
        type: DataTypes.STRING,
        }
    }, {
        timestamps : false
    }
);

User.hasMany(Post, { onDelete: 'CASCADE'});
Post.belongsTo(User, { onDelete: 'CASCADE'});

let user, posts;

sequelize.sync({ alter:true})
.then(() => {
    return User.destroy({ where : { userName : 'Manish'}})
})
.catch((error) => {
    console.log(error)
})