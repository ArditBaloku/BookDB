const express = require('express')
require('dotenv').config()
const expressHandlebars = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000
const db = require('./config/db')

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
  // const sql = 'SELECT * FROM books'
  // db.getConnect()
  //   .then((conn) => {
  //     return db.executeAsync(sql, [], conn)
  //       .then((result) => {
  //         res.json({
  //           status: 'OK',
  //           result: result
  //         })
  //         return db.doRelease(conn)
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //         db.doRelease(conn)
  //       })
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //     db.doRelease(conn)
  //   })
  res.render('home')
})

app.use(express.static(__dirname + '/public'))

app.listen(port, () => console.log(`App listening on port ${port}!`))
