const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialectOptions: {
            charset: 'utf8',
            collate: 'utf8_general_ci',
        },
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
    }
    
)