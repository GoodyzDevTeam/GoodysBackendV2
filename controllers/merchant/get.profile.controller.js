
const mongoose = require('mongoose');
const merchantModel = require('../../models/merchant/merchant').merchantModel;
const { getAccessToken } = require('../../auth/auth');

exports.getMyAccountController = (req, res) => {
  const merchantId = req.userId;
  try {
    merchantModel.findOne({_id: merchantId}, (err, data) => {
      if (err) {
        return res.status(500).send({ message: 'Internal server error'});
      } else {
        const accessToken = getAccessToken(data._id);

        return res.json({ status: 200, user: data,  accessToken });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
}
