const Wishlist = require("../models/WishlistModel");

// Add product to wishlist
exports.addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    // Check if wishlist exists for the user
    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      // Create new wishlist if it doesn't exist
      wishlist = new Wishlist({
        user: userId,
        products: [{ product: productId }],
      });
      await wishlist.save();
      return res.status(201).json({
        success: true,
        message: "Product added to wishlist",
        wishlist,
      });
    }

    // Check if product already exists in wishlist
    const productExists = wishlist.products.find(
      (item) => item.product.toString() === productId
    );

    if (productExists) {
      return res.status(400).json({
        success: false,
        message: "Product already in wishlist",
      });
    }

    // Add product to wishlist
    wishlist.products.push({ product: productId });
    await wishlist.save();

    res.status(200).json({
      success: true,
      message: "Product added to wishlist",
      wishlist,
    });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding to wishlist",
      error: error.message,
    });
  }
};

// Remove product from wishlist
exports.removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    // Remove product from wishlist
    wishlist.products = wishlist.products.filter(
      (item) => item.product.toString() !== productId
    );

    await wishlist.save();

    res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
      wishlist,
    });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while removing from wishlist",
      error: error.message,
    });
  }
};

// Get user's wishlist
exports.getWishlist = async (req, res) => {
  const { userId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ user: userId }).populate({
      path: "products.product",
      model: "Product",
      select: "title price images description category",
      populate: {
        path: "category",
        model: "Category",
        select: "name slug",
      },
    });

    if (!wishlist) {
      return res.status(200).json({
        success: true,
        wishlist: { products: [] },
      });
    }

    res.status(200).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching wishlist",
      error: error.message,
    });
  }
};

// Check if product is in wishlist
exports.checkWishlist = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      return res.status(200).json({
        success: true,
        isInWishlist: false,
      });
    }

    const isInWishlist = wishlist.products.some(
      (item) => item.product.toString() === productId
    );

    res.status(200).json({
      success: true,
      isInWishlist,
    });
  } catch (error) {
    console.error("Error checking wishlist:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while checking wishlist",
      error: error.message,
    });
  }
};

