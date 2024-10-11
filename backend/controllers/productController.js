const Product = require("../models/ProductModel");
const fs = require('fs');
const path = require('path');
const multer = require("multer");

// Set up multer storage to save files locally on disk
exports.storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, "../uploads"); // One level up
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true }); // Create folder if it doesn't exist
      }
      cb(null, uploadPath); // Save in the 'uploads' folder one level up
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Save file with a unique name
    },
  });

////////////////create new product function
exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, category, quantity } = req.body;
    const sellerId = req.user.id;
    console.log(title, description, price, category, quantity);

    const files = req.files; // Get uploaded files (images)
    console.log("files are ", files);
    let imagesArray = [];

    // Loop through files and store their paths in the images array
    if (files && files.length > 0) {
      for (const file of files) {
        imagesArray.push({
          public_id: file.filename, // Using filename as a unique identifier (optional)
          url: `/uploads/${file.filename}`, // Save relative path to image
        });
      }
    }

    // Create a new product instance
    const newProduct = new Product({
      title,
      description,
      price,
      category,
      quantity,
      images: imagesArray, // Save image paths to the product
      sellerId,
    });

    // Save the product to the database
    await newProduct.save();

    res.status(200).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error with creating products ", error);
    res.status(500).json({ message: "Error creating products", error: error.message });
  }
};
