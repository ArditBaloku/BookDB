const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { loadUser } = require('../middlewares/loadUser')

module.exports = router

router.get('/register', loadUser, userController.registerGet)

router.post('/register', loadUser, userController.registerPost)

router.get('/login', loadUser, userController.loginGet)

router.post('/login', loadUser, userController.loginPost)
