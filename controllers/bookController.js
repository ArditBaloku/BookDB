const Book = require('../models/book')
const Joi = require('joi')

const bookSchema = Joi.object().keys({
  title: Joi.string().required(),
  summary: Joi.string(),
  isbn: Joi.string().regex(new RegExp(/^[0-9\-]+$/)).required(),
  authorName: Joi.string().required(),
  authorSurname: Joi.string().required()
})

const bookGet = async (req, res, next) => {
  const bookId = req.params.bookId
  const book = await Book.getBook(bookId)
  if (!book.length) {
    return next(new Error('Not found'))
  }
  // res.render('book',{user : req.session.user , book})
  res.json(book);
}

const booksGet = async (req, res) => {
  const title = req.query.title
  const books = await Book.getBooks(title)
  res.render('books' ,{user : req.session.user , books})
}

const newBookGet = (req, res) => {
  if (!req.session.user || !req.session.user.isAdmin) {
    return res.sendStatus(403)
  }
  res.render('editBook', { user: req.session.user })
}

const newBookPost = async (req, res) => {
  if (!req.session.user || !req.session.user.isAdmin) {
    return res.sendStatus(403)
  }

  const { title, summary, isbn, authorName, authorSurname } = req.body

  const { error } = Joi.validate({ title, summary, isbn, authorName, authorSurname }, bookSchema)

  if (error) {
    return res.render('editBook', {
      user: req.session.user,
      book: {
        title,
        summary,
        isbn,
        authorName,
        authorSurname
      },
      invalidErrDisplay: 'block'
    })
  }

  await Book.insertBook(title, summary, isbn, authorName, authorSurname)
  return res.render('editBook', {user: req.session.user, successDisplay: 'block'})
}

module.exports = {
  bookGet,
  booksGet,
  newBookGet,
  newBookPost
}
