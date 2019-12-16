const Book = require('../models/book')
const Joi = require('joi')

const bookSchema = Joi.object().keys({

})

const newBookGet = (req, res) => {
  if (!req.session.user.isAdmin) {
    return res.sendStatus(403)
  }

  res.render('editBook', { user: req.session.user })
}

const newBookPost = (req, res) => {
  if (!req.session.user.isAdmin) {
    return res.sendStatus(403)
  }

  //validate book info with joi
  //show error if there is one
  //save in db
  //redirect to book page
  res.send('Not implemented')
}

module.exports = {
  newBookGet,
  newBookPost
}
