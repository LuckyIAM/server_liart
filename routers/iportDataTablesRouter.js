const express = require('express')
const router = new express()
const importDataTables = require('../controllers/iportDataTablesController')

// router.get('/newsnews', newsNewsController.getAllRecords)
router.post('/import/news_news', importDataTables.importDataNewsNews)
router.post('/import/page_content', importDataTables.importDataPagesContent)

module.exports = router