const express = require('express')
const router = new express()
const apiNewsNews = require('../controllers/apiNewsNewsController')
 
router.post('/records',apiNewsNews.getLimitRecords)
router.post('/records/years',apiNewsNews.getYearsRecords)

module.exports = router