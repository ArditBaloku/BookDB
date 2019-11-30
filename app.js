const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000
const db = require('./db')

app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
  helpers: {
    section: function(name, options) {
      if(!this._sections) this._sections = {}
      this._sections[name] = options.fn(this)
      return null
  }
}}))
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  const sql = 'SELECT * FROM BOOKS'
  db.getConnect()
    .then((conn) => {
      return db.executeAsync(sql, null, null, conn)
        .then((result) => {
          return res.json({
            status: 'OK',
            result: result
          })
          db.doRelease()
        })
        .catch((err) => {
          console.log(err)
          db.doRelease()
          next(err)
        })
    })
    .catch((err) => {
      console.log(err)
      db.doRelease()
      next(err)
    })
  res.render('home')
})

app.use(express.static(__dirname + '/public'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
