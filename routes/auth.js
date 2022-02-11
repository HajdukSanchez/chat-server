/*
  Path: api/login
*/

const { Router } = require('express')
const router = Router()
const { createUser } = require('../controllers/auth')

router.post('/new', createUser)

module.exports = router
