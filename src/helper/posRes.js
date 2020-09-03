const posRes = {
    success: (res, data, message) => {
        const result = {
            message: message,
            code: 200,
            success: true,
            data: data
        }
        res.json(result);
    },
    failed: (res, data, message) => {
        const result = {
            message: message,
            code: 500,
            success: false,
            data: data
        }
        res.json(result);
    },
    successMeta: (res, data, meta, message) => {
        const result = {
            message,
            code: 200,
            success: true,
            meta,
            data
        }
        res.json(result);
    }
}


module.exports = posRes;