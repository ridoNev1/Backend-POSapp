const db = require('../config/db');
const fs = require('fs');

const posModel = {
    findAll: (searchkey, sortkey, sortlates, limit, offset) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id, image, product_name, price, category, (SELECT COUNT(*) FROM Produk) AS count 
            FROM Produk LEFT JOIN Category ON Produk.id_category=Category.id_category
            WHERE product_name LIKE '%${searchkey}%'
            ORDER BY ${sortkey} ${sortlates} LIMIT ${offset}, ${limit}`, (err, res) => {
                if(err) {
                    reject(new Error(err));
                }else {
                    resolve(res);
                }
            })
        })
    },
    findOne: (id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM Produk WHERE id ='${id}'`, (err, res) => {
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
            db.query(`INSERT INTO Produk (image, product_name, price, id_category)
            VALUES ('${data.image}', '${data.productname}', '${data.price}', '${data.category}')`, (err, res) => {
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
            db.query(`SELECT * FROM Produk WHERE id='${id}'`, (err, resget) => {
                if(err) {
                    reject(new Error(err));
                }else {
                    resolve(new Promise((resolve, reject) => {
                        db.query(`DELETE FROM Produk WHERE id='${id}'`, (err, res) => {
                            const imagename = resget[0].image
                            fs.unlink(`src/assets/${imagename}`, (err) => {
                                if(err) throw err;
                                console.log('Delete image success');
                            })
                            if(err) {
                                reject(new Error(err));
                            }else {
                                resolve(res);
                            }
                        })
                    }))
                }
            })
        })
    },
    updateOne: (data, id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM Produk WHERE id='${id}'`, (err, resget) => {
                if(err) {
                    reject(new Error(err));
                }else {
                    resolve(new Promise((resolve, reject) => {
                        let imagename = null
                        if(!data.image) {
                            imagename = resget[0].image;
                        }else {
                            imagename = data.image;
                            fs.unlink(`src/assets/${resget[0].image}`, (err) => {
                                if(err) throw err;
                                console.log('Update image success');
                            })
                        }
                        db.query(`UPDATE Produk SET image='${imagename}', product_name='${data.productname}', price='${data.price}', id_category='${data.category}'
                        WHERE id='${id}'`, (err, res) => {
                            if(err) {
                                reject(new Error(err));
                            }else {
                                resolve(res);
                            }
                        })
                    }))
                }
            })
        })
    },
    updateDetail: (data, id) => {
        return new Promise((resolve, reject) => {
            if(!data.image) {
                db.query(`SELECT * FROM Produk WHERE id=${id}`, (err, resget) => {
                    if(err) {
                        reject(new Error(err));
                    }else {
                        resolve(new Promise((resolve, reject) => {
                            data.image = resget[0].image;
                            db.query(`UPDATE Produk SET ? WHERE id = ?`, [data, id], (err, res) => {
                                if(err) {
                                    reject(new Error(err));
                                }else {
                                    resolve(res);
                                }
                            })
                        }))
                    }
                })
                
            }else {
                db.query(`SELECT * FROM Produk WHERE id=${id}`, (err, resget) => {
                    if(err) {
                        reject(new Error(err));
                    }else {
                        resolve(new Promise((resolve, reject) => {
                            fs.unlink(`src/assets/${resget[0].image}`, (err) => {
                                if(err) throw err;
                                console.log('Update data success');
                            })
                            db.query(`UPDATE Produk SET ? WHERE id = ?`, [data, id], (err, res) => {
                                if(err) {
                                    reject(new Error(err));
                                }else {
                                    resolve(res);
                                }
                            })
                        }))
                    }
                })
            }
        })
    }
}

module.exports = posModel;