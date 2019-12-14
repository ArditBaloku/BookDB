const db = require('../config/db')

exports.getUser = async (email) => {
  const sql = `SELECT * FROM USERS WHERE USERNAME=:email`
  const conn = await db.getConnect()
  return await db.executeAsync(sql, [email], conn)
}

exports.insertUser = async (email, password) => {
  const sql = `INSERT INTO USERS(USERNAME, PASSWORD) VALUES (:email, :password)`
  const conn = await db.getConnect()
  return await db.executeAsync(sql, [email, password], conn)
}
