
const mongoose = require('mongoose');
const users = require('../../models/users').usersModel;
const { getAccessToken } = require('../../auth/auth');

exports.loginController = (req, res) => {
  try {
    users.findOne({email: req.body.email}, function(err, data) {
      if (err) {
        return res.status(500).send({ message: 'Internal server error'});
      } else if (data != undefined && data != null) {
        
        if (data.password !== req.body.password) {
          return res.status(400).send({ message: 'auth/wrong-password'});
        }
        const accessToken = getAccessToken(data._id);

        return res.json({ status: 200, user: data,  accessToken });
      } else {
        return res.status(400).send({ message: 'auth/user-not-found'});
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
}
