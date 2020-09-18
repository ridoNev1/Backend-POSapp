const user = require('../model/users');
const posRes = require('../helper/posRes');
const { success, failed, successMeta } = posRes;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { PRIVATKEY, REFRESHTOKEN } = require('../helper/env')
const nodemailer = require('nodemailer');
const { result } = require('lodash');
const env = require('../helper/env')

const users = {
  register: async (req, res) => {
    const body = req.body
    const salt = await bcrypt.genSalt(10)
    const hasPw = await bcrypt.hash(body.password, salt)
    const data = {
      email: body.email,
      password: hasPw
    }
    jwt.sign(
      { email: data.email },
      'RMS)@!!@#',
      { expiresIn: '2h' }, (err, res) => {
        if (err) {
          res.send('failed')
        } else {
          let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            requireTLS: true,
            auth: {
              user: env.EMAIL, // generated ethereal user
              pass: env.EMAIL_PASS, // generated ethereal password
            },
          })

          let registerEmail = `<div>
          <p>Follow link for activation</p>
          <a href="http://localhost:3000/pos/users/actived/${res}">click</a>
          </div>`
          transporter.sendMail({
            from: `👻 ${env.EMAIL}`, // sender address
            to: data.email, // list of receivers
            subject: "Activation email ✔", // Subject line
            html: registerEmail, // html body
          });
        }
      }
    )
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

        if (isMatch) {
          if (result[0].is_active === 1) {
            const dataUser = {
              email: result[0].email,
              level: result[0].level
            }
            const refreshToken = jwt.sign(dataUser, REFRESHTOKEN)
            const token = generateToken(dataUser)
            if (result[0].refreshtoken === null) {
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
          } else {
            res.status(401)
            failed(res, [], 'Need Activation')
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
      res.json({ newToken: refresh })
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
        success(res, result, 'Logout user success');
      }).catch(err => {
        failed(res, [], err.message)
      })
  },
  activations: (req, res) => {
    const token = req.params.token
    jwt.verify(token, 'RMS)@!!@#', (err, decode) => {
      if (err) {
        res.status(500)
        res.send('activation failed')
      } else {
        const email = decode.email
        user.activation(email)
          .then(result => {
            success(res, result, 'Activation Success')
          }).catch(err => {
            res.status(500)
            failed(res, [], err.message)
          })
      }
    })
  }
}

// function make token like a god
const generateToken = (email) => {
  return jwt.sign(email, PRIVATKEY, { expiresIn: 3600 })
}

module.exports = users;


