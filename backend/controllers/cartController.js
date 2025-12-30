const Cart = require('../models/CartModel');
const Product = require("../models/ProductModel");


// Add a single item to the cart
exports.createCart = async (req, res) => {
  const { userId, productId, count } = req.body;
  console.log(req.body);

  try {
    // Check if the cart exists for the user
    let cart = await Cart.findOne({ orderby: userId });

    if (!cart) {
      // If cart doesn't exist, create a new one with the product
      const newCart = new Cart({
        orderby: userId,
        products: [{ product: productId, count }]
      });
      await newCart.save();
      return res.status(201).json({
        success: true,
        message: "Cart created with the item",
        cart: newCart
      });
    }

    // If cart exists, check if the product is already in the cart
    const productExists = cart.products.find(
      (item) => item.product.toString() === productId
    );

    if (productExists) {
      // If product exists, increment its quantity
      productExists.count += count;
    } else {
      // Otherwise, add the product to the cart
      cart.products.push({ product: productId, count });
    }

    await cart.save();
    return res.status(200).json({
      success: true,
      message: "Item added to the cart",
      cart
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while adding to the cart",
      error: error.message
    });
  }
};


// Get all cart details
exports.getCart = async (req, res) => {
  const { userId } = req.params; // Assuming userId is sent as a route parameter

  try {
    // Find the cart for the given userId
    const cart = await Cart.findOne({ orderby: userId }).populate({
      path: 'products.product',
      model: 'Product', // Reference the Product model for product details
      select: 'title price images description', // Select fields to return
    });

    // If no cart exists for the user, return empty cart instead of 404
    if (!cart) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
        cart: { products: [] },
      });
    }

    // Return cart details
    return res.status(200).json({
      success: true,
      message: "Cart details fetched successfully",
      cart,
    });
  } catch (error) {
    // Error handling
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the cart details",
      error: error.message,
    });
  }
};



// Update quantity of a specific item in the cart (plus/minus buttons)
exports.updateCartItem = async (req, res) => {
  const { userId, productId, count } = req.body;
  console.log("userid and productid and count is ",userId, productId, count);
  try {
    const cart = await Cart.findOne({ orderby: userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    // Find the product in the cart
    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found in the cart"
      });
    }

    // Update the count for the product
    cart.products[productIndex].count = count;

    // Remove the product if the count is 0
    if (count <= 0) {
      cart.products.splice(productIndex, 1);
    }

    await cart.save();
    
    // Populate product details before sending response
    const populatedCart = await Cart.findOne({ orderby: userId }).populate({
      path: 'products.product',
      model: 'Product',
      select: 'title price images description',
    });

    return res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      cart: populatedCart
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the cart",
      error: error.message
    });
  }
};

// Remove an item from the cart
exports.removeCartItem = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ orderby: userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    // Remove the product from the cart
    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();
    return res.status(200).json({
      success: true,
      message: "Item removed from the cart",
      cart
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while removing the item from the cart",
      error: error.message
    });
  }
};
