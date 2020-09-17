const posModel = require('../model/posModel');
const posRes = require('../helper/posRes');
const { success, failed, successMeta } = posRes;
const upload = require('../helper/upload')
const redis = require('redis')
const redisClient = redis.createClient()

const posCont = {
    findAll: (req, res) => {
        const searchkey = !req.query.searchname ? '' : req.query.searchname;
        const sortkey = !req.query.sortkey ? 'id' : req.query.sortkey;
        const sortlates = !req.query.sortlates ? '' : req.query.sortlates;
        const dblimit = !req.query.dblimit ? '10' : parseInt(req.query.dblimit);
        const page = !req.query.page ? '1' : parseInt(req.query.page);
        const offset = page === 1 ? '0' : (page - 1) * dblimit;

        posModel.findAll(searchkey, sortkey, sortlates, dblimit, offset)
            .then(result => {
                const totalRow = result[0].count
                const meta = {
                    totalRow,
                    totalPage: Math.ceil(totalRow / dblimit),
                    page
                }
                successMeta(res, result, meta, 'Get all data success');
            }).catch(err => {
                failed(res, [], err.message);
            })
        
        posModel.getRedis()
        .then(resredis => {
            const dataRes = JSON.stringify(resredis)
            redisClient.set('dataproduct', dataRes)
        }).catch(err => {
            failed(res, [], 'err set redis');
        })
    },
    findOne: (req, res) => {
        const id = req.params.id;
        posModel.findOne(id)
            .then(result => {
                success(res, result, 'Get detail data success');
            }).catch(err => {
                failed(res, [], err.message);
            })
    },
    insertOne: (req, res) => {
        upload.single('image')(req, res, (err) => {
            if (err) {
                if(err.message === "File too large") {
                    failed(res, [], 'Ukuran File terlalu besar')
                }
                failed(res, [], err);
            } else {
                const data = req.body
                data.image = req.file.filename
                posModel.insertOne(data)
                    .then(result => {
                        redisClient.del('dataproduct')
                        success(res, result, 'Insert data success');
                    }).catch(err => {
                        failed(res, [], err.message);
                    })
            }
        })
    },
    deleteOne: (req, res) => {
        const id = req.params.id;
        posModel.deleteOne(id)
            .then(result => {
                redisClient.del('dataproduct')
                success(res, result, 'Delete data success');
            }).catch(err => {
                failed(res, [], err.message);
            })
    },
    updateOne: (req, res) => {
        const id = req.params.id;
        const data = req.body
        data.image = req.file.filename
        posModel.updateOne(data, id)
            .then(result => {
                redisClient.del('dataproduct')
                success(res, result, 'Update data success');
            }).catch(err => {
                failed(res, [], err.message);
            })
    },
    updateDetail: (req, res) => {
        const id = req.params.id;
        const data = req.body
        data.image = !req.file ? '' : req.file.filename
        posModel.updateDetail(data, id)
            .then(result => {
                redisClient.del('dataproduct')
                success(res, result, 'Update data success');
            }).catch(err => {
                failed(res, [], err.message);
            })
    }
}

module.exports = posCont;
