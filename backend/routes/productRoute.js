  const express = require('express');
  const router = express.Router();
  const { createCategories, getCategories, getSubCategories } = require('../controllers/categoryCreater');
  const { createProduct } = require('../controllers/productController');
  const authenticateToken = require('../middlewares/auth');
  
  router.post("/createCat", createCategories);
  router.get("/getCat", getCategories);
  router.get("/getSubCat", getSubCategories);

  router.post("/createItem", createProduct);
  
  module.exports = router;
  
  