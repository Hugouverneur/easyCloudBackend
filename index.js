const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const createVm = require('./createVm');

const port = process.env.PORT || 8080;

const app = express()
    .use(cors())
    .use(bodyParser.json())
    .use(createVm())


app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});