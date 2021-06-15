const mongoose = require('mongoose');
const merchantModel = require('../../models/merchant/merchant').merchantModel;

exports.uploadMenuController = async (req, res) => {
	const userId = req.userId;
	console.log(req.body.menu);
  try {
    await merchantModel.updateOne({_id: userId}, { menu: req.body.menu });
    return res.status(200).send('OK');
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
}
