const db = require('../config/db');

const historyModel = {
    findAll: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM History JOIN historydetail ON History.id=historydetail.id_history`, (err, res) => {
                if(err) {
                    reject(new Error(err));
                }else {
                    resolve(res);
                }
            })
        })
    },
    findHistory: () => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM History`, (err, res) => {
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
            db.query(`INSERT INTO History (invoices, cashier, amount)
             VALUES ('${data.invoices}', '${data.cashier}', '${data.amount}')`, (err, res) => {
                 if(err) {
                     reject(new Error(err));
                 }else {
                     resolve(res);
                 }
             })
        })
    },
    insertDetail: (masterId, data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO historydetail (id_history, id_product, product_name, qty, price)
             VALUES ('${masterId}', '${data.id_product}', '${data.product_name}', '${data.qty}', '${data.price}')`, (err, res) => {
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
            db.query(`DELETE FROM History WHERE id='${id}'`, (err, res) => {
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
            db.query(`UPDATE History SET invoices='${data.invoices}', cashier='${data.cashier}', date='${data.date}', orders='${data.orders}', amount='${data.amount}' WHERE id='${id}'`, (err, res) => {
                if(err) {
                    reject(new Error(err));
                }else {
                    resolve(res);
                }
            })
        })
    }
}

module.exports = historyModel;