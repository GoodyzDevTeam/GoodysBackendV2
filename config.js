const dbHost = "mongodb+srv://dbWill:GoodysDB4567$@goodys0.bcbve.mongodb.net/GoodyDB?retryWrites=true&w=majority";
//const dbHost = "mongodb://127.0.0.1:27017/goody";
const JWT_SECRET = 'minimal-secret-key';
const JWT_EXPIRES_IN = '5 days';

module.exports = { dbHost, JWT_EXPIRES_IN, JWT_SECRET }