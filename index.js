const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const manageVm = require('./manageVm');
const manageUser = require('./manageUser');

const port = process.env.PORT || 8080;

const app = express()
    .use(cors())
    .use(bodyParser.json())
    .use(manageVm())
    .use(manageUser())


app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});