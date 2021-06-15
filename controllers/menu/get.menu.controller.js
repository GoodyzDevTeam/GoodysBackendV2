const mongoose = require('mongoose');
const merchantModel = require('../../models/merchant/merchant').merchantModel;

exports.getMenuController = async (req, res) => {
  const userId = req.userId;
  try {
    const results = await merchantModel.findOne({_id: userId});
    console.log(results);
    return res.status(200).send({ menu: results.menu });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
}
