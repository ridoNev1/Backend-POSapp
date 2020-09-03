const categoryModel = require('../model/categoryModel');
const posRes = require('../helper/posRes');
const { success, failed } = posRes;

const categoryCont = {
    findAll: (req, res) => {
        categoryModel.findAll()
            .then(result => {
                success(res, result, 'Get all category data success');
            }).catch(err => {
                failed(res, [], err.message);
            })
    },
    insertOne: (req, res) => {
        const data = req.body
        categoryModel.insertOne(data)
            .then(result => {
                success(res, result, 'Insert data success');
            }).catch(err => {
                failed(res, [], err.message);
            })
    },
    deleteOne: (req, res) => {
        const id = req.params.id;
        categoryModel.deleteOne(id) 
            .then(result => {
                success(res, result, 'Delete data success');
            }).catch(err => {
                failed(res, [], err.message);
            })
    },
    updateOne: (req, res) => {
        const id = req.params.id;
        const data = req.body
        categoryModel.updateOne(data, id)
            .then(result => {
                success(res, result, 'Update data success');
            }).catch(err => {
                failed(res, [], err.message);
            })
    }
}

module.exports = categoryCont;