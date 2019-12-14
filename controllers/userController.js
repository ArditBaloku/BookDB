const User = require('../models/user')
const Joi = require('joi')
const bcrypt = require('bcryptjs')

const registerSchema = Joi.object().keys({
  email: Joi.string().email(),
  password: Joi.string().regex(/^[a-zA-Z0-9!@.]{8,20}$/)
})

exports.registerGet = (req, res) => {
  res.render('register', { invalidErrDisplay: "none", emailErrDisplay: "none" })
}

exports.registerPost = async (req, res) => {
  const { email, password } = req.body
  const { error } = Joi.validate({ email: email, password: password}, registerSchema)

  if (error) {
    return res.render('register', { invalidErrDisplay: 'block' })
  }

  const result = await User.getUser(email)

  if (result.length) {
    return res.render('register', { emailErrDisplay: 'block' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  await User.insertUser(email, hashedPassword)
  return res.render('register', { successDisplay: 'block'})
}

exports.loginGet = (req, res) => {
  res.send('NOT IMPLEMENTED: Login')
}

exports.loginPost = (req, res) => {
  res.send('NOT IMPLEMENTED: Login')
}
