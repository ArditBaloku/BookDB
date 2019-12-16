const express = require('express')
const router = express.Router()
const { loadUser } = require('../middlewares/loadUser')
const { bookGet, booksGet, newBookGet, newBookPost } = require('../controllers/bookController')

router.get('/new', loadUser, newBookGet)

router.post('/new', loadUser, newBookPost)

router.get('/search', loadUser, booksGet)

router.get('/:bookId', loadUser, bookGet)

module.exports = router
