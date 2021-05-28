/* Express Packages */
const express = require('express');
const app = express();
const compression = require('compression');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require("helmet");
const path = require("path");
const cookieParser = require("cookie-parser");


/* app.use # packages */
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(compression());
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


/* Routes */
const indexRoute = require('./routes/index');
const routesAccount = require('./routes/account.route.js');

app.use('/', indexRoute);
app.use('/api/account', routesAccount);

/* Database */
const connectDB = require('./application/utils/connect.db');
connectDB();

/* Start API */
const port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('# Running on port ' + port + ' #');
})

module.exports = app;