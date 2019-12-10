const User = require('../models/user')
const Joi = require('joi')

const registerSchema = Joi.object().keys({
  email: Joi.string().email(),
  password: Joi.string().regex(/^[a-zA-Z0-9!@.]{8,20}$/)
})

exports.registerGet = (req, res) => {
  res.render('register')
}

exports.registerPost = (req, res) => {
  const {error, value} = Joi.validate({ email: req.body.email, password: req.body.password}, registerSchema)

  console.log(error)
  console.log(value)
  // call model to see if email is in db
  // call model to insert user
  res.send('NOT IMPLEMENTED: Register')
}

exports.loginGet = (req, res) => {
  res.send('NOT IMPLEMENTED: Login')
}

exports.loginPost = (req, res) => {
  res.send('NOT IMPLEMENTED: Login')
}
