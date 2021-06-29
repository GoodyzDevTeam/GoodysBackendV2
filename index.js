/* Express Packages */
const express = require('express');
const app = express();
const compression = require('compression');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const logger = require("morgan");
const cors = require('cors');
const helmet = require("helmet");
const path = require("path");
const cookieParser = require("cookie-parser");


/* app.use # packages */

app.use(helmet());
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


/* Routes */
const indexRoute = require('./routes/index');
const routesAccount = require('./routes/account.route.js');
const routesProduct = require('./routes/product.route');
const routesDispensary = require('./routes/dispensary.route');
const routesBrand = require('./routes/brand.route');
const routesDeal = require('./routes/deal.route');
const routesDelivery = require('./routes/delivery.route');
const routesMerchant = require('./routes/merchant.route');
const routesMenu = require('./routes/menu.route');
const routesOrders = require('./routes/orders.route');
const routesReview = require('./routes/review.route');

app.use('/', indexRoute);
app.use('/api/account', routesAccount);
app.use('/api/product', routesProduct);
app.use('/api/dispensary', routesDispensary);
app.use('/api/brand', routesBrand);
app.use('/api/deal', routesDeal);
app.use('/api/delivery', routesDelivery);
app.use('/api/merchant', routesMerchant);
app.use('/api/menu', routesMenu);
app.use('/api/orders', routesOrders);
app.use('/api/review', routesReview);

/* Database */
const connectDB = require('./application/utils/connect.db');
connectDB();

/* Start API */
const port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('# Running on port ' + port + ' #');
})

module.exports = app;
