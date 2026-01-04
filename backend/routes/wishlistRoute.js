const express = require("express");
const router = express.Router();
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  checkWishlist,
} = require("../controllers/wishlistController");

router.post("/add", addToWishlist);
router.delete("/remove", removeFromWishlist);
router.get("/:userId", getWishlist);
router.get("/check/:userId/:productId", checkWishlist);

module.exports = router;

