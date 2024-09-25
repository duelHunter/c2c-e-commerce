  const express = require('express');
  const router = express.Router();
  const { createCategories } = require('../controllers/categoryCreater');
  const authenticateToken = require('../middlewares/auth');
  
  router.get("/createCat", createCategories);
  
  module.exports = router;
  
  