const jwt = require('jsonwebtoken')
const env = require('../helper/env')
const { PRIVATKEY } = env

const auth = {
  authentication: (req, res, next) => {
    const token = req.headers.token;
    if(!token) {
      res.send({
        msg: 'token required'
      })
    }else {
      next()
    }
  },
  admin: (req, res, next) => {
    const token = req.headers.token;
    jwt.verify(token, PRIVATKEY, (err, decode) => {
      if(err && err.name === 'JsonWebTokenError') {
        res.status(500)
        res.send({
          code: 500,
          msg: 'Invalid token'
        })
      } else if (err && err.name === 'TokenExpiredError') {
        res.status(401)
        res.send({
          msg: 'failed, token expired'
        })
      } else {
        if(decode.level === 1) {
          next()
        } else {
          res.status(403)
          res.send({
            msg: 'Only Admin'
          })
        }
      }
    })
  },
  authorization: (req, res, next) => {
    const token = req.headers.token;
    jwt.verify(token, PRIVATKEY, (err, decode) => {
      if(err && err.name === 'JsonWebTokenError') {
        res.send({
          msg: 'Invalid token'
        })
      } else if (err && err.name === 'TokenExpiredError') {
        res.send({
          msg: 'failed, token expired'
        })
      } else {
        next()
      }
    })
  }
}

module.exports = auth