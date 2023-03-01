const { Clothing, User } = require("../models");

module.exports = {
  // create clothing
  createClothing({ body }, res) {
    Clothing.create(body)
      .then((dbClothingData) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { clothing: dbClothingData._id } },
          { new: true }
        )
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "Clothing purchase created but no user with this id!" });
        }
        res.json({ message: "Clothing purchase successfully created!" });
      })
      .catch((err) => res.status(500).json(err));
  },

  // get one Clothing by id
  getClothingById({ params }, res) {
    Clothing.findOne({ _id: params.id })
      .then((dbClothingData) => {
        if (!dbClothingData) {
          return res.status(404).json({ message: "No clothing data found with this id!" });
        }
        res.json(dbClothingData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // delete clothing data
  deleteClothing({ params }, res) {
    Clothing.findOneAndDelete({ _id: params.id })
      .then((dbClothingData) => {
        if (!dbClothingData) {
          res.status(404).json({ message: "No clothing data found with this id!" })
        }
        // remove clothing on user data
        return User.findOneAndUpdate(
          { clothing: params.id },
          { $pull: { clothing: params.id } },
          { new: true }
        )
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "Clothing deleted but no user with this id!" });
        }
        res.json({ message: "Clothing successfully deleted!" });
      })
      .catch((err) => res.status(500).json(err));
  },
};