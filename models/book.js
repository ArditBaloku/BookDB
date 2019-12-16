const db = require('../config/db')


const insertBook = async (title, summary, isbn, authorName, authorSurname) => {
  const sql = `INSERT INTO BOOKS(TITLE, SUMMARY, ISBN, AUTHOR) VALUES(
    :title, :summary, ISBN(':isbn'), AUTHOR(':authorName', ':authorSurname')
  )`
  const conn = await db.getConnect()
  return await db.executeAsync(sql, [title, summary, isbn, authorName, authorSurname], conn)
}

const updateBook = async (bookId, title, summary, isbn, authorName, authorSurname) => {
  const sql = `UPDATE BOOKS SET
  TITLE=':title',
  SUMMARY=':summary',
  ISBN=ISBN(':isbn'),
  AUTHOR=AUTHOR(':authorName',':authorSurname')
  WHERE BOOKID=':bookId'`
  const conn = await db.getConnect()
  return await db.executeAsync(sql, [bookId, title, summary, isbn, authorName, authorSurname], conn)
}

const deleteBook = async (bookId) => {
  const sql = `DELETE FROM BOOKS WHERE BOOKID=:bookId`
  const conn = await db.getConnect()
  return await db.executeAsync(sql, [bookId], conn)
}

module.exports = {
  insertBook,
  updateBook,
  deleteBook
}
