const express = require('express')
const personController = require('../controller/person')

const router = express.Router()

router.get('/',personController.getSingleUser)

router.post('/login',personController.loginUser)

router.post('/register',personController.createUser)

module.exports = router
