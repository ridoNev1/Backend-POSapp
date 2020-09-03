const express = require('express');
const routes = express.Router();
const posCont = require('../controller/posCont');
const { findAll, findOne, insertOne, deleteOne, updateOne, updateDetail } = posCont;
const categoryCont = require('../controller/categoryCont');
const upload = require('../helper/upload');
const historyCont = require('../controller/historyCont');

routes
    .get('/find', findAll)
    .get('/findone/:id', findOne)
    .post('/insert', upload.single('image'),insertOne)
    .delete('/delete/:id', deleteOne)
    .put('/update/:id', upload.single('image'), updateOne)
    .patch('/update/:id', upload.single('image'), updateDetail)

    .get('/findcategory', categoryCont.findAll)
    .post('/insertcategory', categoryCont.insertOne)
    .delete('/deletecategory/:id', categoryCont.deleteOne)
    .put('/updatecategory/:id', categoryCont.updateOne)

    .get('/findhistory', historyCont.findAll)
    .post('/inserthistory', historyCont.insertOne)
    .delete('/deletehistory/:id', historyCont.deleteOne)
    .put('/updatehistory/:id', historyCont.updateOne)

module.exports = routes;