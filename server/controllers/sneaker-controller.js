const { Sneaker, User } = require("../models");

module.exports = {
  // create sneakers
  createSneaker({ body }, res) {
    Sneaker.create(body)
      .then((dbSneakerData) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { sneaker: dbSneakerData._id } },
          { new: true }
        )
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "Sneaker purchase created but no user with this id!" });
        }
        res.json({ message: "Sneaker purchase successfully created!" });
      })
      .catch((err) => res.status(500).json(err));
  },

  // get one Sneaker by id
  getSneakerById({ params }, res) {
    Sneaker.findOne({ _id: params.id })
      .then((dbSneakerData) => {
        if (!dbSneakerData) {
          return res.status(404).json({ message: "No sneaker data found with this id!" });
        }
        res.json(dbSneakerData);
      })
      .catch((err) => res.status(500).json(err));
  },

  // delete sneaker data
  deleteSneaker({ params }, res) {
    Sneaker.findOneAndDelete({ _id: params.id })
      .then((dbSneakerData) => {
        if (!dbSneakerData) {
          res.status(404).json({ message: "No sneaker data found with this id!" })
        }
        // remove sneaker on user data
        return User.findOneAndUpdate(
          { sneaker: params.id },
          { $pull: { sneaker: params.id } },
          { new: true }
        )
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "Sneaker deleted but no user with this id!" });
        }
        res.json({ message: "Sneaker successfully deleted!" });
      })
      .catch((err) => res.status(500).json(err));
  },
};