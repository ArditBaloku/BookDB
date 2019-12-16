const db = require('../config/db')

const getBook = async (bookId) => {
  const sql = `SELECT * FROM BOOKS WHERE BOOKID=:bookId`
  const conn = await db.getConnect()
  return await db.executeAsync(sql, [bookId], conn)
}

const getBooks = async (title) => {
  const lowerTitle = `%${title.toLowerCase()}%`
  console.log(`lowertitle: ${lowerTitle}`)
  const sql = `SELECT * FROM BOOKS WHERE LOWER(TITLE) LIKE :lowerTitle`
  const conn = await db.getConnect()
  return await db.executeAsync(sql, [lowerTitle], conn)
}

const insertBook = async (title, summary, isbn, authorName, authorSurname) => {
  const sql = `INSERT INTO BOOKS(TITLE, SUMMARY, ISBN, AUTHOR) VALUES(
    :title, :summary, ISBN(:isbn), AUTHOR(:authorName, :authorSurname)
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
  getBook,
  getBooks,
  insertBook,
  updateBook,
  deleteBook
}
