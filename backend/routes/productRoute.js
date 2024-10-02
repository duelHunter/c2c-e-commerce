  const express = require('express');
  const router = express.Router();
  const { createCategories, getCategories } = require('../controllers/categoryCreater');
  const authenticateToken = require('../middlewares/auth');
  
  router.get("/createCat", createCategories);
  router.get("/getCat", getCategories);
  
  module.exports = router;
  
  