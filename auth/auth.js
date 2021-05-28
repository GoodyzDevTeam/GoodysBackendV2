const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const myEnv = dotenv.config();

exports.auth = async (req, res, next) => {
    const Authorization  = req.rawHeaders[req.rawHeaders.indexOf('Authorization') + 1];

    if (!Authorization) {
      return res.status(401).send({ message: 'Authorization token missing'});
    }

    const accessToken = Authorization.split(' ')[1];
    const { userId } = jwt.verify(accessToken, process.env.JWT_SECRET);
    req.userId = userId;
    next();
}

exports.getAccessToken = (userId) => {
  return jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
}