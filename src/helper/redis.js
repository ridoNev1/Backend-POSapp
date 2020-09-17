const redis = require('redis')
const client = redis.createClient();
const _ = require('lodash')

module.exports = {
    dataProduct: (req, res, next) => {
        client.get('dataproduct', (err, reply) => {
            if (reply) {
                const data = JSON.parse(reply)
                const searchkey = !req.query.searchname ? null : req.query.searchname;
                const dblimit = !req.query.dblimit ? '10' : parseInt(req.query.dblimit);
                const page = !req.query.page ? '1' : parseInt(req.query.page);
                const sortkey = !req.query.sortkey ? 'id' : req.query.sortkey;
                const sortlates = !req.query.sortlates ? 'asc' : req.query.sortlates;
                // pagination setting
                const startPage = (page - 1) * dblimit
                const endPage = page * dblimit
                // sort
                const sort = _.orderBy(data, [sortkey], [sortlates])
                // redis data 
                let redisData = sort
                // search
                if (searchkey !== null) {
                    const search = sort.filter(e => e.product_name.toLowerCase().includes(searchkey.toLowerCase()))
                    redisData = search
                }
                res.send({
                    message: 'get data from redis',
                    code: 200,
                    success: true,
                    meta: {
                        totalRow: redisData.length,
                        totalPage: Math.ceil(redisData.length / dblimit),
                        page
                    },
                    data: redisData.slice(startPage, endPage) //data di paginasi di sini
                })
            } else {
                next()
            }
        });
    }
}

