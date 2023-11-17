require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT || 5000
const sequelize = require('./db')
const model = require('./models/models')
const cors = require('cors')
const filesUpload = require('express-fileupload')
const router = require('./routers/index')

const app = new express()
app.use(cors())
app.use(express.json())
app.use(filesUpload({}))
app.use('/api', router)

const start  = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server started on PORT ${PORT}`)
        })
    }
    catch (e) {
        console.log(e);
    }
}
start()
