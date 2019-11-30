const oracledb = require('oracledb')

oracledb.autoCommit = true
oracledb.outFormat = oracledb.OBJECT
let db = {}

const connectionProperties = {
  user: "Ardit",
  password: "123456",
  connectString: `(DESCRIPTION=
    (ADDRESS=
      (PROTOCOL=TCP)
      (HOST=localhost)
      (PORT=1521)
    )
    (CONNECT_DATA=
      (SID=fiekdb)
    )
  )`
}

db.getConnect = () => new Promise((resolve, reject) => {
  oracledb.getConnection(connectionProperties, (err, connection) => {
    if (connection) {
      resolve(connection)
    } else {
      reject(err)
    }
  })
})

db.doRelease = (connection) => {
  return connection.close((err) => {
      if (err) {
        console.error(err.message);
      }
    })
}

db.executeAsync = (sql, bindParams, connection) => {
  return new Promise((resolve, reject) => {
      connection.execute(sql, bindParams, (err, result) => {
          if (err) {
              console.error(err.message)
              reject(err)
          }
          resolve(result.rows)
      })
  })
}

module.exports = db
