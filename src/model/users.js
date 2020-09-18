const db = require('../config/db');


const user = {
  register: (data) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO users (email, password, level, is_active) VALUES ('${data.email}', '${data.password}', 2, 0)`, (err, res) => {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(res);
        }
      })
    })
  },
  login: (data) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE email = ?`, data.email, (err, res) => {
        if(err) {
          reject(new Error(err))
        }else {
          resolve(res)
        }
      })
    })
  },
  updateToken: (token ,id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE users SET refreshtoken='${token}' WHERE id='${id}'`, (err, res) => {
        if(err) {
          reject(new Error(err))
        }else {
          resolve(res)
        }
      })
    })
  },
  deleteUsers: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM users WHERE id = ?`, id, (err, res) => {
        if(err) {
          reject(new Error(err))
        }else {
          resolve(res)
        }
      })
    })
  },
  logout: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE users SET refreshtoken=null WHERE id='${id}'`, id, (err, res) => {
        if(err) {
          reject(new Error(err))
        }else {
          resolve(res)
        }
      })
    })
  },
  activation: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE users SET is_active=1 WHERE email='${email}'`, (err, res) => {
        if(err) {
          reject(new Error(err))
        }else {
          resolve(res)
        }
      })
    })
  }
}

module.exports = user;