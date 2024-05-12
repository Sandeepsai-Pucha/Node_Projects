const Sequelize = require('sequelize')
const {DataTypes, Op} = Sequelize 

const sequelize = new Sequelize('mydb', 'root', 'Sandeepsai@204', {
    dialect: 'mysql'
})

const Customer = sequelize.define('customer', {
    customerName: {
        type: DataTypes.STRING
        }
    }, {
        timestamps: false
    }
);

const Product = sequelize.define('product', {
    productName: {
        type: DataTypes.STRING
        }
    }, {
        timestamps: false
    }
);


Customer.belongsToMany(Product, { through : 'customerproducts'})
Product.belongsToMany(Customer, { through : 'customerproducts'})

let customer, product;

sequelize.sync({ alter: true})
.then(() => {
    return Customer.destroy({ where : { customerName: 'Sandeep'}})
})
.then((data) => {
    console.log(data)
})
.catch((error) => {
    console.log(error)
})