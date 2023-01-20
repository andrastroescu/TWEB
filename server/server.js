const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const { restart } = require('nodemon')
const cors =  require('cors')

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
    destination: Sequelize.STRING,
    departure_date: Sequelize.DATE,
    arrival_date: Sequelize.DATE,
    city: Sequelize.STRING,
    country: Sequelize.STRING,
    type: Sequelize.STRING,
    origin: Sequelize.STRING
    // customerId: Sequelize.STRING,
})

Customer.hasMany(TravelPlan);

sequelize.sync({force:true})
    .then(() => {
        console.warn('tables created')
        Customer.create({
            name: "Ion Popescu",
            email: "ion.popescu@yahoo.com"      
        })
        Customer.create({
            name: "Gabriel Ionescu",
            email: "gab.ionescu@yahoo.com"      
        })
    }).catch((err) => console.log(err))

const app = express()

app.use(cors()) 
app.use(express.json())

// middleware
app.use(bodyParser.json())

app.get('/customers', async(req,res) => {
    try {
        const customers = await Customer.findAll()
        res.status(200).json(customers)
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured'})
    }
})

app.get('/travelplans', async(req,res) => {
    try {
        const travelplans = await TravelPlan.findAll()
        res.status(200).json(travelplans)
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured'})
    }
})

app.post('/travelplans', async(req,res) => {
    try {
        await TravelPlan.create(req.body)
        res.status(200).json({message: 'The travel plan was created!'})
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured'})
    }
})

app.get('/travelplans/:tid', async(req,res) => {
    try {
        const travelplan = await TravelPlan.findByPk(req.params.tid);
        // ({
        //         where: {
        //             customerId: req.params.cid
        //         }
        // })
        if (travelplan){
            res.status(200).json(travelplan)
        }else {
            res.status(404).json({message: "not found"})
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured'})
    }
})

app.put('/travelplans/:tid',async(req,res) => {
    try {
        const travelplan = await TravelPlan.findByPk(req.params.tid);
        // ({
        //         where: {
        //             travelPlanId: req.params.tid,
        //         },
        //         order: [[ 'createdAt', 'DESC' ]],
        // })
        if (travelplan){
            console.log(travelplan)
            await travelplan.update(req.body, { fields: ['departure_date', 'arrival_date', 'origin', 'destination'] })
            res.status(202).json(travelplan)
        }else {
            res.status(404).json({message: "not found"})
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured'})
    }
})

app.delete('/travelplans/:tid', async(req,res) => {
    try {
        const travelplan = await TravelPlan.findByPk(req.params.tid);

        // ({
        //         where: {
        //             travelPlanId: req.params.tid,
        //         },
        //         order: [[ 'createdAt', 'DESC' ]],
        // })

        if (travelplan){
            await travelplan.destroy()
            res.status(202).json(travelplan)
        }else {
            res.status(404).json({message: "not found"})
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json({message: 'some error occured'})
    }
})

app.get('/customers/:cid/travelplans', async(req,res) => {
    try{
        const customer = await Customer.findByPk(req.params.cid);
        if (customer){
            const travelplans = await customer.getTravelPlans()
            res.status(200).json(travelplans)
        } else {
            res.status(404).json({message: "not found"})
        }
    } catch (err) {
        console.warn(err);
        res.status(500).json({message: "some error occured"})
    }
})

app.post('/customers/:cid/travelplans', async(req,res) => {
    try{
        const customer = await Customer.findByPk(req.params.cid);
        if (customer){
            const travelplan = req.body
            travelplan.customerId = customer.id
            await TravelPlan.create(travelplan)
            res.status(200).json({message: "created"})
        } else {
            res.status(404).json({message: "not found"})
        }
    } catch (err) {
        console.warn(err);
        res.status(500).json({message: "some error occured"})
    }
})

app.get('/customers/:cid/travelplans/:tid', async(req,res) => {
    try{
        const customer = await Customer.findByPk(req.params.cid);
        if (customer){
            const travelplans = await customer.getTravelPlans({where: { id: req.params.tid}})
            const travelplan = travelplans.shift()
            if (travelplan) {
                res.status(200).json(travelplans)
            } else {
                res.status(404).json({message: "travel plan not found"})
            }
        } else {
            res.status(404).json({message: "customer not found"})
        }
    } catch (err) {
        console.warn(err);
        res.status(500).json({message: "some error occured"})
    }
})

app.put('/customers/:cid/travelplans/:tid', async(req,res) => {
    try{
        const customer = await Customer.findByPk(req.params.cid);
        if (customer){
            const travelplans = await customer.getTravelPlans({where: { id: req.params.tid}})
            const travelplan = travelplans.shift()
            if (travelplan) {
                await(travelplan.update(req.body))
                res.status(202).json(travelplans)
            } else {
                res.status(404).json({message: "travel plan not found"})
            }
        } else {
            res.status(404).json({message: "customer not found"})
        }
    } catch (err) {
        console.warn(err);
        res.status(500).json({message: "some error occured"})
    }
})

app.delete('/customers/:cid/travelplans/:tid', async(req,res) => {
    try{
        const customer = await Customer.findByPk(req.params.cid);
        if (customer){
            const travelplans = await customer.getTravelPlans({where: { id: req.params.tid}})
            const travelplan = travelplans.shift()
            if (travelplan) {
                await travelplan.destroy()
                res.status(202).json(travelplans)
            } else {
                res.status(404).json({message: "travel plan not found"})
            }
        } else {
            res.status(404).json({message: "customer not found"})
        }
    } catch (err) {
        console.warn(err);
        res.status(500).json({message: "some error occured"})
    }
})





// app.get("/api", (req, res) => {
//     res.json({"users": ["userOne", "userTwo", "userThree"]})
// })

app.listen(5000, () => {console.log("server started on port 5000")})