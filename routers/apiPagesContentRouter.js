const express = require('express')
const router = new express()
const apiPagesContent = require('../controllers/apiPagesContentController')
 
router.get('/adress', apiPagesContent.getPageLibraryAddress)
router.get('/contact', apiPagesContent.getPageContact)

module.exports = router