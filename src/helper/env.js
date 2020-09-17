require('dotenv').config()

const env = {
    PORT: process.env.PORT,
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    NAME: process.env.DB_NAME,
    PRIVATKEY: process.env.PRIVATEKEY,
    REFRESHTOKEN: process.env.REFRESHTOKEN
}

module.exports = env;