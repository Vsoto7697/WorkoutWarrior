const router = require("express").Router();
const {
  createClothing,
  getClothingById,
  deleteClothing,
} = require("../../controllers/clothing-controller");

const {
  createSneaker,
  getSneakerById,
  deleteSneaker,
} = require("../../controllers/sneaker-controller");

// import middleware
const { authMiddleware } = require('../../utils/auth');

// on insominia: 
// choose Auth bearer, add response-body attribute and edit tag
// change request to the login api
// change filter to $. to find token
router.use(authMiddleware);

// /api/purchase/sneaker
router.route("/sneaker").post(createSneaker);

// /api/purchase/sneaker/:id
router.route("/sneaker/:id").get(getSneakerById).delete(deleteSneaker);

// /api/purchase/clothing
router.route("/clothing").post(createClothing);

// /api/purchase/clothing/:id
router.route("/clothing/:id").get(getClothingById).delete(deleteClothing);

module.exports = router;