const express = require('express')
const router = express.Router()
const mainController = require('../controllers/mainController')
router.get('/', mainController.index) 
router.get('/roasts', mainController.roasts) 
router.get('/pos', mainController.menu) 
router.get('/coredrinks', mainController.coredrinks) 
router.post('/order', mainController.order) 
module.exports = router