const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./src/router/posRouter');
const cors= require('cors');
const env = require('./src/helper/env');
const { PORT } = env;
const routesCategory = require('./src/router/categoryRouter')
const routesHistory = require('./src/router/historyRouter')


app.use(express.static('src/assets'))
app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json())
app.use(cors())
app.use('/pos', routes);
app.use('/category', routesCategory);
app.use('/history', routesHistory)


app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
})

