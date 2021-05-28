
const mongoose = require('mongoose');
const users = require('../../models/users').usersModel;

exports.getAccountController = (req, res) => {

  try {
    const { userId } = req;
    users.findOne({_id: userId}, (err, data) => {
      if (err) {
        return res.status(500).send({ message: 'Internal server error'});
      } else if (data != undefined && data != null) {
        if (data.length == 0) {
          return res.status(401).send({ message: 'Invalid authorization token'});
        }

        return res.json({ status: 200, user: data});
      } else {
        return res.status(401).send({ message: 'Invalid authorization token'});
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
}
