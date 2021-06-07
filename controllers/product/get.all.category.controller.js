
const mongoose = require('mongoose');
const category = require('../../models/product/category').categoryModel;

exports.getAllCategoriesController = async (req, res) => {

  try {
    const results = await category.find({});
    return res.status(200).send(results);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
}
