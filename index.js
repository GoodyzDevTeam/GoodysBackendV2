/* Express */
let express = require('express')
let app = express()

/* Packages */
//let newrelic = require('newrelic');
let compression = require('compression')
let mongoose = require('mongoose');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let cors = require('cors');

/* Routes */
let routesAccount = require('./routes/account.route.js');

/* CLI Arguments */
let parseArgs = require('minimist')

let port = process.env.PORT || 8080;

/* End CLI Arguments */

/* Configs */
let config = require('./config');

/* Database options */
let options = {
    //useMongoClient: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

/* Database */
console.log(config.dbHost);
mongoose.connect(config.dbHost, options);
let db = mongoose.connection;

/* Mongoose fix depreciation promise */
mongoose.Promise = Promise;

/* Database # Error Handling */
db.on('error', console.error.bind(console, 'connection error:'));

/* Testing environment */
// if (config.util.getEnv('NODE_ENV') !== 'test') {
//     //use morgan to log at command line
//     app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
// }

/* app.use # packages */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(compression());
app.use(cors());

/* app.user custom modification */

/* Accounts routes */
app.use('/api/account', routesAccount);

/* Start API */
app.listen(port, function() {
    console.log('# Running on port ' + port + ' #');
})

module.exports = app;