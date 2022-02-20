/*
  Path: api/login
*/

const { Router } = require('express')
const { check } = require('express-validator')

const router = Router()
const { createUser, login, renovateJWT } = require('../controllers/auth')
const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt')

// The second arguments are the middelwares that will be applied to the route.
router.post(
  '/new',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email format is not valid').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields,
  ],
  createUser
)

router.post('/', [check('email', 'Email format is not valid').isEmail(), check('password', 'Password is required').not().isEmpty()], login)

router.get('/renovate', validateJWT, renovateJWT)

module.exports = router
