const express = require('express')
const forumController = require('../controller/forum')

const router = express.Router()

router.get('/',forumController.getAllForum)

router.get('/message/all',forumController.getAllMessageSingleForum)

router.post('/message',forumController.createMessageSingleForum)


module.exports = router
