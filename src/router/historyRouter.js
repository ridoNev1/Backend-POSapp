const express = require('express');
const routes = express.Router();
const historyCont = require('../controller/historyCont');
const { authentication, authorization, admin } = require('../helper/auth')
// const { dataProduct } = require('../helper/redis')

routes
  .get('/find', authentication, authorization, historyCont.findAll)
  .get('/findhistory', authentication, authorization, historyCont.findHistory)
  .post('/insert', authentication, authorization, historyCont.insertOne)
  .delete('/delete/:id', authentication, authorization, admin, historyCont.deleteOne)
  .put('/update/:id', authentication, authorization, admin, historyCont.updateOne)


module.exports = routes