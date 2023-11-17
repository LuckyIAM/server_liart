const express = require('express')
const router = new express()
const importDataTables = require('./iportDataTablesRouter')
const apiNewsNewsRouter =require('./apiNewsNewsRouter')
const apiPagesContent = require('./apiPagesContentRouter')

router.use('/v1', importDataTables)
router.use('/v1/limit', apiNewsNewsRouter)
router.use('/v1/page', apiPagesContent)
module.exports = router