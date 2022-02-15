/*
  Path: api/login
*/

const { Router } = require('express')
const { check } = require('express-validator')

const router = Router()
const { createUser } = require('../controllers/auth')

// The second arguments are the middelwares that will be applied to the route.
router.post('/new', [check('name', 'Name is required').not().isEmpty()], createUser)

module.exports = router
