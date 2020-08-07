const db = require('../utils/db')

module.exports = {
  getTodosCount: (data = {}) => {
    const sql = `SELECT COUNT(*) as total FROM todos
    WHERE id LIKE '${data.search || ''}%' 
    ORDER BY id ${parseInt(data.sort) ? 'DESC' : 'ASC'}`
    return new Promise((resolve, reject) => {
      db.query(sql, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result[0].total)
      })
    })
  },
  createTodos: (data) => {
    const sql = 'INSERT INTO todos SET ?'
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
  getTodosByCondition: (data) => {
    const sql = 'SELECT * FROM todos WHERE ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result)
      })
    })
  },
  getTodosByUser: (data, condition, start, end) => {
    const sql = `SELECT * FROM todos WHERE ? &&
    todos.note LIKE '${condition.search || ''}%'
    ORDER BY todos.id ${parseInt(condition.sort) ? 'DESC' : 'ASC'}
    LIMIT ${end} OFFSET ${start}`
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result)
      })
    })
  },
  updateTodos: (data) => {
    const sql = 'UPDATE todos SET ? WHERE ?'
    return new Promise((resolve, reject) => {
      db.query(sql, data, (error, result) => {
        if (error) {
          reject(Error(error))
        }
        resolve(result.affectedRows)
      })
    })
  },
  deleteTodos: (data) => {
    const sql = 'DELETE FROM todos WHERE ?'
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
