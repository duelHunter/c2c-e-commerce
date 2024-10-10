  const express = require('express');
  const router = express.Router();
  const { createCategories, getCategories } = require('../controllers/categoryCreater');
  const authenticateToken = require('../middlewares/auth');
  
  router.post("/createCat", createCategories);
  router.get("/getCat", getCategories);
  
  module.exports = router;
  
  