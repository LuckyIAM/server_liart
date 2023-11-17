const {News} = require('../models/models')

class GetNewsNews{
    async getLimitRecords(req, res){
        const page = req.query.page
        const limit = 10
        const quantityRecords = await News.count()
        // console.log(quantityRecords);

        const startIndex = quantityRecords - (page * limit)
        const endIndex = quantityRecords - ((page - 1) * limit)
        
        const news_news = await News.findAll()
        const result = news_news.slice(startIndex, endIndex)
        res.json({data: result})
    }
    async getYearsRecords(req, res){
        let recordsYear = []
        const year = req.query.year
        const records = await News.findAll()
        records.forEach(elem => {
            let date = new Date(elem.create_date)
            console.log(elem.create_date, date.getFullYear());
            if(date.getFullYear() == year){
                recordsYear.push(elem)
            }

        })
        res.json(recordsYear)
    }
    
}

module.exports = new GetNewsNews()