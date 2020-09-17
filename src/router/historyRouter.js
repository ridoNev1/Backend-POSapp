const express = require('express');
const routes = express.Router();
const historyCont = require('../controller/historyCont');
const { authentication, authorization } = require('../helper/auth')
// const { dataProduct } = require('../helper/redis')

routes
  .get('/find', authentication, authorization, historyCont.findAll)
  .post('/insert', authentication, authorization, historyCont.insertOne)
  .delete('/delete/:id', authentication, authorization, historyCont.deleteOne)
  .put('/update/:id', authentication, authorization, historyCont.updateOne)


module.exports = routes