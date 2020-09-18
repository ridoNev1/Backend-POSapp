const express = require('express');
const routes = express.Router();
const posCont = require('../controller/posCont');
const { findAll, findOne, insertOne, deleteOne, updateOne, updateDetail } = posCont;
const upload = require('../helper/upload');
const user = require('../controller/user')
const { authentication, admin, authorization } = require('../helper/auth')
const { dataProduct } = require('../helper/redis')

routes
    .get('/find', authentication, authorization, dataProduct, findAll)
    .get('/findone/:id', authentication, authorization, findOne)
    .post('/insert',authentication, authorization, admin, insertOne)
    .delete('/delete/:id', authentication, authorization, admin, deleteOne)
    .put('/update/:id', authentication, authorization, admin, upload.single('image'), updateOne)
    .patch('/update/:id', authentication, authorization, admin, upload.single('image'), updateDetail)

    .post('/users/register', user.register)
    .post('/users/login', user.login)
    .post('/users/token', user.token)
    .delete('/users/delete/:id', user.deleteUsers)
    .patch('/users/logout/:id', user.logout)
    .get('/users/actived/:token', user.activations)

module.exports = routes;