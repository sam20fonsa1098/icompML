const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors())
const consign = require('consign');
consign().include('controllers').into(app);

module.exports = app;