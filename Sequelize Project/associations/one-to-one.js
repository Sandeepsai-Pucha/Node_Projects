const Sequelize = require('sequelize')

const {DataTypes, Op} = Sequelize 

const sequelize = new Sequelize('mydb', 'root', 'Sandeepsai@204', {
    dialect: 'mysql'
})

const State = sequelize.define('state', {
    stateName:{
        type: DataTypes.STRING,
        unique: true
        }
    }, {
        timestamps:false
    }    
);

const Capital = sequelize.define('capital', {
    capitalName:{
        type: DataTypes.STRING,
        unique: true
        }
    }, {
        timestamps:false
    }    
);

State.hasOne(Capital, {onDelete: 'CASCADE'})
Capital.belongsTo(State, {onDelete: 'CASCADE'})

sequelize.sync({ alter: true})
.then(async () => {
    const transaction = await sequelize.transaction()
        try {
            await State.destroy({where : {stateName:'dghgkda'}, transaction});
            await transaction.commit();
            console.log('State deleted successfully');
          } catch (error) {
            await transaction.rollback();
            console.log(error);
        }
})
.catch((error) => {
    console.log(error)
}) 