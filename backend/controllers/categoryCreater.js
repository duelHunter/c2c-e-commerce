const Category = require('../models/CategoryModel');

// Controller to create categories from frontend JSON data
exports.createCategories = async (req, res) => {
  try {
    const categories = req.body; // Get categories JSON from the request body
    const savedCategories = {}; // To store the saved categories and their IDs

    // Iterate over the categories object
    for (const [key, value] of Object.entries(categories)) {
      let parentCategoryId = null;

      // If it's the first category (main category), check if it already exists
      if (key == 1) {
        const existingCategory = await Category.findOne({ slug: value.toLowerCase().replace(/ /g, "_") });

        if (existingCategory) {
          console.log(`Main category '${value}' already exists`);
          savedCategories[key] = existingCategory; // Store the existing main category
        } else {
          // If not found, create the main category
          const mainCategory = new Category({
            name: value,
            slug: value.toLowerCase().replace(/ /g, "_"),
          });
          const savedCategory = await mainCategory.save();
          savedCategories[key] = savedCategory; // Store the newly created main category
        }
      } else {
        // For subcategories, set the parent as the previous category (main or another subcategory)
        const previousKey = key - 1;
        parentCategoryId = savedCategories[previousKey]._id; // Set parent category as the previous category

        // Create and save the subcategory
        const subCategory = new Category({
          name: value,
          slug: value.toLowerCase().replace(/ /g, "_"),
          parentCategory: parentCategoryId, // Set parent category ID
        });
        const savedCategory = await subCategory.save();
        savedCategories[key] = savedCategory; // Store the newly created subcategory
      }
    }

    console.log("Categories created successfully!");

    // Respond to the frontend with a success message
    res.status(200).json({
      message: "Categories created successfully",
      categories: savedCategories,
    });

  } catch (error) {
    console.error("Error creating categories:", error);
    res.status(500).json({ message: "Error creating categories", error: error.message });
  }
};

// The controller to send predefined categories to the frontend
exports.getCategories = async (req, res) => {
  try {
    // Fetch all categories from the database
    const categories = await Category.find({parentCategory: null}).select("name slug");

    // Respond with the fetched categories
    res.status(200).json({
      message: "Categories fetched successfully",
      categories, // Return the list of categories
    });

  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Error fetching categories", error: error.message });
  }
};

// The controller to send predefined sub-categories to the frontend
exports.getSubCategories = async (req, res) => {
  try {
    const parentCatId = req.query.category;
    console.log(parentCatId);
    // Fetch all categories from the database
    const subCategories = await Category.find({parentCategory: parentCatId}).select("name slug");

    // Respond with the fetched categories
    res.status(200).json({
      message: "Categories fetched successfully",
      subCategories, // Return the list of categories
    });

  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Error fetching categories", error: error.message });
  }
};

// The controller to send predefined brands to the frontend
// exports.getBrands = async (req, res) => {
//   try {
//     const parentCatId = req.query.category;
//     console.log(parentCatId);
//     // Fetch all categories from the database
//     const subBrands = await Category.find({parentCategory: parentCatId}).select("name slug");

//     // Respond with the fetched categories
//     res.status(200).json({
//       message: "Categories fetched successfully",
//       subBrands, // Return the list of categories
//     });

//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     res.status(500).json({ message: "Error fetching categories", error: error.message });
//   }
// };