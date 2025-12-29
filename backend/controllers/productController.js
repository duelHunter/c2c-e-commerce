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


// Get all product details for the home page cards using product-id
exports.getAllProducts = async (req, res) => {
    try {
      // Fetch all products from the database
      const products = await Product.find();
  
      // If no products found, return a message
      if (!products || products.length === 0) {
        return res.status(404).json({
          message: "No products found",
        });
      }
  
      // Return the products in the response
      res.status(200).json({
        message: "Products fetched successfully",
        products,
      });
    } catch (error) {
      console.error("Error fetching products: ", error);
      res.status(500).json({
        message: "Error fetching products",
        error: error.message,
      });
    }
  };

  //get selected product data for products pages
  //use id to find product
  exports.getSelectedProduct = async (req, res) => {
    try {
      // Get the product ID from request parameters
      const productId = req.params.id;
  
      // Find the product by ID
      const selectedProduct = await Product.findById(productId);
  
      // If the product is not found, return a message
      if (!selectedProduct) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
  
      // Return the selected product in the response
      res.status(200).json({
        message: "Product fetched successfully",
        product: selectedProduct,
      });
    } catch (error) {
      console.error("Error fetching product: ", error);
      res.status(500).json({
        message: "Error fetching product",
        error: error.message,
      });
    }
  };

  // Get all products for the authenticated seller (My Store)
  exports.getMyProducts = async (req, res) => {
    try {
      const sellerId = req.user.id; // Get seller ID from authenticated user
      
      // Find all products for this seller
      const products = await Product.find({ sellerId })
        .populate('category', 'name slug') // Populate category details
        .sort({ createdAt: -1 }); // Sort by newest first
  
      // Return the products in the response
      res.status(200).json({
        message: "Products fetched successfully",
        products,
        count: products.length,
      });
    } catch (error) {
      console.error("Error fetching seller products: ", error);
      res.status(500).json({
        message: "Error fetching products",
        error: error.message,
      });
    }
  };

  // Update product (only by the seller who owns it)
  exports.updateProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const sellerId = req.user.id;
      const { title, description, price, category, quantity } = req.body;

      // Find the product and verify ownership
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.sellerId.toString() !== sellerId) {
        return res.status(403).json({ message: "You don't have permission to update this product" });
      }

      // Handle image updates if new images are uploaded
      let imagesArray = product.images || [];
      if (req.files && req.files.length > 0) {
        // Add new images to existing ones
        for (const file of req.files) {
          imagesArray.push({
            public_id: file.filename,
            url: `/uploads/${file.filename}`,
          });
        }
      }

      // Update product
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        {
          title: title || product.title,
          description: description || product.description,
          price: price || product.price,
          category: category || product.category,
          quantity: quantity !== undefined ? quantity : product.quantity,
          images: imagesArray,
        },
        { new: true }
      ).populate('category', 'name slug');

      res.status(200).json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (error) {
      console.error("Error updating product: ", error);
      res.status(500).json({
        message: "Error updating product",
        error: error.message,
      });
    }
  };

  // Delete product (only by the seller who owns it)
  exports.deleteProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const sellerId = req.user.id;

      // Find the product and verify ownership
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.sellerId.toString() !== sellerId) {
        return res.status(403).json({ message: "You don't have permission to delete this product" });
      }

      // Delete associated image files
      if (product.images && product.images.length > 0) {
        for (const image of product.images) {
          const imagePath = path.join(__dirname, "..", image.url);
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        }
      }

      // Delete the product
      await Product.findByIdAndDelete(productId);

      res.status(200).json({
        message: "Product deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting product: ", error);
      res.status(500).json({
        message: "Error deleting product",
        error: error.message,
      });
    }
  };