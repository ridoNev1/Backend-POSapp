const jwt = require('jsonwebtoken')

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
  authorization: (req, res, next) => {
    const token = req.headers.token;
    jwt.verify(token, 'rms)@!!@#', (err) => {
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