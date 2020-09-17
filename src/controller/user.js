const user = require('../model/users');
const posRes = require('../helper/posRes');
const { success, failed, successMeta } = posRes;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {PRIVATKEY, REFRESHTOKEN} = require('../helper/env')

const users = {
  register: async(req, res) => {
    const body = req.body
    const salt = await bcrypt.genSalt(10)
    const hasPw = await bcrypt.hash(body.password, salt)
    const data = {
      email: body.email,
      password:hasPw
    }
    user.register(data)
      .then(result => {
        success(res, result, 'Insert user success');
      }).catch(err => {
        failed(res, [], err.message);
      })
  },
  login: (req, res) => {
    const body = req.body
    user.login(body)
    .then(async result => {
      const password = result[0].password
      const isMatch = await bcrypt.compare(body.password, password)
      const id = result[0].id
      
      if(isMatch) {
        const email = {email: result[0].email}
        const refreshToken = jwt.sign(email, REFRESHTOKEN)
        const token = generateToken(email)
        if(result[0].refreshtoken === null) {
          user.updateToken(refreshToken, id)
            .then(results => {
              const data = {
                token,
                token_refresh: refreshToken
              }
              success(res, data, 'get token success');
              
            }).catch(err => {
              console.log(err.message);
            })
        } else {
          const data = {
            token,
            token_refresh: result[0].refreshtoken
          }
          success(res, data, 'get token success');
        }
      }
      else {
        failed(res, [], 'Wrong Password');
      }
    }).catch(err => {
      failed(res, [], err.message);
    })
  },
  token: (req, res) => {
    const token = req.body.token
    jwt.verify(token, REFRESHTOKEN, (err, result) => {
      const refresh = generateToken({
        email: result.email
      })
      res.json({newToken: refresh})
    })
  },
  deleteUsers: (req, res) => {
    const id = req.params.id
    user.deleteUsers(id)
      .then(result => {
        success(res, result, 'Delete user success');
      }).catch(err => {
        failed(res, [], err.message)
      })
  },
  logout: (req, res) => {
    const id = req.params.id
    user.logout(id)
      .then(result => {
        success(res, result, 'Delete user success');
      }).catch(err => {
        failed(res, [], err.message)
      })
  } 
}

// function make token like a god
const generateToken = (email) => {
  return jwt.sign(email, PRIVATKEY, {expiresIn: 3600})
}

module.exports = users; 


