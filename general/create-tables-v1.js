const Sequelize = require('sequelize')

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "tweb.db"
})

const Customer = sequelize.define('customer', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
})

const TravelPlan = sequelize.define('travelplan', {
    destination: {
        type: Sequelize.STRING,
        allowNull: false
    },
    departure_date:{
        type: Sequelize.DATE,
        allowNull: false,
    },
    arrival_date:{
        type: Sequelize.DATE,
        allowNull: false,
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


Customer.hasMany(TravelPlan);
// TravelPlan.belongsTo(Customer);


// drop tables first (force:true)
sequelize.sync({force:true})
    .then(() => {
        console.warn('tables created')
    }).catch((err) => console.log(err))