const express = require('express')
const router = express.Router()
const { loadUser } = require('../middlewares/loadUser')
const { newBookGet, newBookPost } = require('../controllers/bookController')

router.get('/new', loadUser, newBookGet)

router.post('/book/new', loadUser, newBookPost)


module.exports = router
