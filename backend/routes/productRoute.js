const express = require("express");
const router = express.Router();
const { createCategories, getCategories, getSubCategories } = require("../controllers/categoryCreater");
const { createProduct } = require("../controllers/productController");
const authenticateToken = require("../middlewares/auth");
const multer = require("multer");

// Import the same multer configuration from the controller file
const { storage } = require("../controllers/productController");
const upload = multer({ storage: storage }); // Use the multer storage configuration

router.post("/createCat", createCategories);
router.get("/getCat", getCategories);
router.get("/getSubCat", getSubCategories);

//////////////////////////////////////////////////////////////////////////////////////
// Use the `upload.array()` method to handle multiple images
router.post("/createItem", authenticateToken, upload.array("images", 5), createProduct);

module.exports = router;
