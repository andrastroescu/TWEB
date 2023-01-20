const Sequelize = require('sequelize')

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "tweb.db"
})

sequelize.authenticate()
    .then(()=>{
        console.warn("we are connected!!")
    }).catch((err) => {
         console.warn(err)
    })
