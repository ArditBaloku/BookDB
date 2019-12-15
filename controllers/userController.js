const User = require('../models/user')
const Joi = require('joi')
const bcrypt = require('bcryptjs')

const registerSchema = Joi.object().keys({
  email: Joi.string().email(),
  password: Joi.string().regex(/^[a-zA-Z0-9!@.]{8,20}$/)
})

const registerGet = (req, res) => {
  if (req.session.user) {
    return res.redirect('/')
  }
  return res.render('register')
}

const registerPost = async (req, res) => {
  if (req.session.user) {
    return res.redirect('/')
  }

  const { email, password } = req.body
  const { error } = Joi.validate({ email: email, password: password}, registerSchema)

  if (error) {
    return res.render('register', { invalidErrDisplay: 'block' })
  }

  const result = await User.getUserByEmail(email)

  if (result.length) {
    return res.render('register', { emailErrDisplay: 'block' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  await User.insertUser(email, hashedPassword)
  return res.render('register', { successDisplay: 'block'})
}

const loginGet = (req, res) => {
  if (req.session.user) {
    return res.redirect('/')
  }
  return res.render('login')
}

const loginPost = async (req, res) => {
  if (req.session.user) {
    return res.redirect('/')
  }

  const { email, password } = req.body
  const user = await User.getUserByEmail(email)

  if (!user.length) {
    return res.render('login', { invalidErrDisplay: 'block' })
  }

  bcrypt.compare(password, user[0].PASSWORD, (err, success) => {
    if (err) {
      return res.render('login', { invalidErrDisplay: 'block' })
    }

    req.session.userId = user[0].USERID
    return res.redirect('/')
  })
}

module.exports = {
  loginGet,
  loginPost,
  registerGet,
  registerPost
}
