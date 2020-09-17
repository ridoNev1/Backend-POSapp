const express = require('express');
const routes = express.Router();
const categoryCont = require('../controller/categoryCont');
// const { authentication, authorization } = require('../helper/auth')
// const { dataProduct } = require('../helper/redis')

routes
  .get('/find', categoryCont.findAll)
  .post('/insert', categoryCont.insertOne)
  .delete('/delete/:id', categoryCont.deleteOne)
  .put('/update/:id', categoryCont.updateOne)


  module.exports = routes;