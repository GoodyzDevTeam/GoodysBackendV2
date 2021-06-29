
const mongoose = require('mongoose');
const category = require('../../models/product/category').categoryModel;

exports.getCategoryController = async (req, res) => {
  try {
    const results = await category.findOne({ _id: req.params.categoryId });
    return res.status(200).send(results);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
}
