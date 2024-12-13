const Cart = require('../models/CartModel');
const Product = require("../models/ProductModel");

// Create a new cart or update an existing one
exports.createCart = async (req, res) => {
    try {
        const { products, orderby } = req.body;

        // Validate input
        if (!products || products.length === 0) {
            return res.status(400).json({ error: "Products are required" });
        }

        if (!orderby) {
            return res.status(400).json({ error: "Orderby (user ID) is required" });
        }

        // Check if the user already has a cart
        let cart = await Cart.findOne({ orderby });

        if (!cart) {
            // Create a new cart
            cart = new Cart({
                products: [],
                orderby,
            });
        } else {
            // Reset the cart products (optional behavior)
            cart.products = [];
        }

        let cartTotal = 0;

        // Add products to the cart
        for (const item of products) {
            const { product, count } = item;

            // Validate product existence
            const productDetails = await Product.findById(product);
            if (!productDetails) {
                return res.status(404).json({ error: `Product with ID ${product} not found` });
            }

            // Add product to the cart
            cart.products.push({
                product: productDetails._id,
                count,
            });

            // Calculate cart total (if needed)
            cartTotal += productDetails.price * count;
        }

        // Optional: Add cart total to the schema (uncomment if using cartTotal field)
        // cart.cartTotal = cartTotal;

        // Save the cart
        const savedCart = await cart.save();

        res.status(201).json({
            message: "Cart created/updated successfully",
            cart: savedCart,
        });
    } catch (error) {
        console.error("Error creating cart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


// Remove a specific item from the cart
exports.removeCartItem = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        // Validate userId and productId
        if (!userId || !productId) {
            return res.status(400).json({ success: false, message: "User ID and Product ID are required" });
        }

        // Find the user's cart
        const cart = await Cart.findOne({ orderby: userId });
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        // Remove the product from the cart
        const productIndex = cart.products.findIndex(
            (item) => item.product.toString() === productId
        );

        if (productIndex === -1) {
            return res.status(404).json({ success: false, message: "Product not found in the cart" });
        }

        // Remove the product from the products array
        cart.products.splice(productIndex, 1);

        // Save the updated cart
        await cart.save();

        res.status(200).json({
            success: true,
            message: "Product removed from the cart successfully",
            cart,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error removing item from cart",
            error: error.message,
        });
    }
};