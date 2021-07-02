const mongoose = require('mongoose');
const dispensary = require('../../models/dispensary/dispensary').dispensaryModel;
const favoriteDispensary = require('../../models/dispensary/favorite.dispensary').favoriteDispensaryModel;

exports.toggleFavoriteDispensariesController = async (req, res) => {
  const userId = req.userId;
  const dispensaryId = req.body.dispensaryId;

  try {
    const stored = await favoriteDispensary.find({ user: userId, dispensary: dispensaryId });
    console.log(stored);
    if (!stored || stored.length == 0) {
      const newFP = new favoriteDispensary({
        _id: new mongoose.Types.ObjectId(),
        user: userId,
        dispensary: dispensaryId
      });
      await newFP.save();
    } else {
      await favoriteDispensary.deleteMany({ user: userId, dispensary: dispensaryId });
    }
    
    const results = await favoriteDispensary.find({ user: userId })
      .populate({ path: 'dispensary', model: 'dispensaries' });
    return res.status(200).send(results);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal server error'});
  }
}
