const db = require('../config/db');

const categoryModel = {
    findAll: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM Category`, (err, res) => {
                if(err) {
                    reject(new Error(err));
                }else {
                    resolve(res);
                }
            })
        })
    },
    insertOne: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO Category (category) VALUES ('${data.category}')`, (err, res) => {
                if(err) {
                    reject(new Error(err));
                }else {
                    resolve(res);
                }
            })
        })
    },
    deleteOne: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM Category WHERE id_category='${id}'`, (err, res) => {
                if(err) {
                    reject(new Error(err));
                }else {
                    resolve(res);
                }
            })
        })
    },
    updateOne: (data, id) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE Category SET category='${data.category}'
             WHERE id_category='${id}'`, (err, res) => {
                if(err) {
                    reject(new Error(err));
                }else {
                    resolve(res);
                }
            })
        })
    }
}

module.exports = categoryModel;