/*
  Path: api/messages
*/

const { Router } = require('express')
const { getChatMessages } = require('../controllers/messages')
const { validateJWT } = require('../middlewares/validate-jwt')

const router = Router()

// Dynamic parameter in the route
router.get('/:from', validateJWT, getChatMessages)

module.exports = router
