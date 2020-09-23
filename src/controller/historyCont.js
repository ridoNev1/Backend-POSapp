const historyModel = require('../model/historyModel');
const posRes = require('../helper/posRes');
const{ success,failed } = posRes;

const historyCont = {
    findAll: (req, res) => {
        historyModel.findAll()
            .then(result => {
                success(res, result, 'Get all data success');
            }).catch(err => {
                failed(res, [], err.message);
            })
    },
    findHistory: (req, res) => {
        historyModel.findHistory()
            .then(result => {
                success(res, result, 'Get all data success');
            }).catch(err => {
                failed(res, [], err.message);
            })
    },
    insertOne: (req, res) => {
        const data = req.body
        historyModel.insertOne(data)
            .then(result => {
                const detail = req.body.detail
                const masterId = result.insertId
                const insertDetail = detail.map(e => {
                    historyModel.insertDetail(masterId, e)
                })
                Promise.all(insertDetail).then(() => {
                    success(res, result, 'Insert transaksi success');
                }).catch(err => {
                    failed(res, [], err.message);
                })
            }).catch(err => {
                failed(res, [], err.message);
            })
    },
    deleteOne: (req, res) => {
        const id = req.params.id;
        historyModel.deleteOne(id) 
            .then(result => {
                success(res, result, 'Delete data success');
            }).catch(err => {
                failed(res, [], err.message);
            }) 
    },
    updateOne: (req, res) => {
        const id = req.params.id;
        const data = req.body
        historyModel.updateOne(data, id) 
            .then(result => {
                success(res, result, 'Update data success');
            }).catch(err => {
                failed(res, [], err.message);
            })
    }
}

module.exports = historyCont;
