const Sequelize = require('sequelize')

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "tweb.db"
})

const Customer = sequelize.define('customer', {
    name: Sequelize.STRING,
    email: Sequelize.STRING
})

sequelize.sync()
    .then(() => {
        console.warn('tables created')
    })