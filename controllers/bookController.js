const Book = require('../models/book')
const Joi = require('joi')

const bookSchema = Joi.object().keys({
  title: Joi.string().required(),
  summary: Joi.string(),
  isbn: Joi.string().regex(new RegExp(/^[0-9\-]$/)).required(),
  authorName: Joi.string().required(),
  authorSurname: Joi.string().required()
})

const newBookGet = (req, res) => {
  if (!req.session.user.isAdmin) {
    return res.sendStatus(403)
  }

  res.render('editBook', { user: req.session.user })
}

const newBookPost = async (req, res) => {
  if (!req.session.user.isAdmin) {
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

  await User.insertBook(title, summary, isbn, authorName, authorSurname)
  res.send('Success')
}

module.exports = {
  newBookGet,
  newBookPost
}
