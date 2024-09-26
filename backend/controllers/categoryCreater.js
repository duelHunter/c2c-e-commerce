const Category = require('../models/CategoryModel');

// Controller to create predefined categories on a GET request
exports.createCategories = async (req, res) => {
  console.log("Category creation GET request received");

  try {
    // Predefined category data
    const electronics = new Category({
      name: "Electronics",
      slug: "electronics",
    });
    await electronics.save();

    const homeAppliances = new Category({
      name: "Home Appliances",
      slug: "home_appliances",
      parentCategory: electronics._id, // Set Electronics as the parent
    });
    await homeAppliances.save();

    const irons = new Category({
      name: "Irons",
      slug: "irons",
      parentCategory: homeAppliances._id, // Set Home Appliances as the parent
    });
    await irons.save();

    console.log("Categories created successfully!");

    // Respond to the frontend with a success message
    res.status(200).json({
      message: "Categories created successfully",
      categories: {
        electronics,
        homeAppliances,
        irons,
      },
    });

  } catch (error) {
    console.error("Error creating categories:", error);
    res.status(500).json({ message: "Error creating categories", error: error.message });
  }
};