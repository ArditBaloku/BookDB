const db = require('../config/db')


const insertBook = async (title, summary, isbn, authorName, authorSurname) => {
  const sql = `INSERT INTO BOOKS(TITLE, SUMMARY, ISBN, AUTHOR) VALUES(
    :title, :summary, ISBN(':isbn'), AUTHOR(':authorName', ':authorSurname')
  )`
  const conn = await db.getConnect()
  return await db.executeAsync(sql, [title, summary, isbn, authorName, authorSurname], conn)
}

module.exports = {
  insertBook
}
