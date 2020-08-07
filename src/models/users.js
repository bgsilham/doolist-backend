const db = require('../utils/db')

module.exports = {
  getAllUser: (start, end, data = {}) => {
    const sql = `SELECT id, email, created_at FROM users 
    WHERE email LIKE '${data.search || ''}%' 
    ORDER BY email ${parseInt(data.sort) ? 'DESC' : 'ASC'}
    LIMIT ${end} OFFSET ${start}`
    return new Promise((resolve, reject) => {
      db.query(sql, (error, result, fields) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result)
      })
    })
  },
  getUserCount: (data = {}) => {
    const sql = `SELECT COUNT(*) as total FROM users
    WHERE email LIKE '${data.search || ''}%' 
    ORDER BY email ${parseInt(data.sort) ? 'DESC' : 'ASC'}`
    return new Promise((resolve, reject) => {
      db.query(sql, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result[0].total)
      })
    })
  },
  createUser: (data) => {
    const sql = 'INSERT INTO users SET ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        console.log(result)
        resolve(result.insertId)
      })
    })
  },
  getUserByCondition: (data) => {
    const sql = 'SELECT * FROM users WHERE ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result)
      })
    })
  },
  deleteUser: (data) => {
    const sql = 'DELETE FROM users WHERE ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result.affectedRows)
      })
    })
  }
}
