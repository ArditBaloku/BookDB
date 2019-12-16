const express = require('express')
const router = express.Router()
const { loadUser } = require('../middlewares/loadUser')
const { bookGet, newBookGet, newBookPost } = require('../controllers/bookController')

router.get('/:bookId', loadUser, bookGet)

router.get('/new', loadUser, newBookGet)

router.post('/new', loadUser, newBookPost)

module.exports = router
