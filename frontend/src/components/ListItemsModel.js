import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "../context/ToastContext";

function ListItemsModel({ onProductCreated, showEmptyState = true }) {
  const toast = useToast();
  // State to manage which modal is open
  const [currentModal, setCurrentModal] = useState(0); // 0: none, 1: first, 2: second, 3: third
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [subcategories, setSubcategories] = useState([]);

  //store the form data to variables
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProductImages(files);

    // Create image preview URLs
    const imageURLs = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(imageURLs);
    console.log(imageURLs);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("category", selectedSubcategory);
    formData.append("brand", selectedBrand);
    formData.append("title", productTitle);
    formData.append("description", productDescription);
    formData.append("quantity", quantity);
    formData.append("price", price);

    // Assuming multiple images are selected
    for (let i = 0; i < productImages.length; i++) {
      formData.append("images", productImages[i]);
    }

    const token = localStorage.getItem("marketpulsetoken");
    
    try {
      let response;
      if (isEditMode && editingProduct) {
        // Update existing product
        response = await axios.put(
          `${process.env.REACT_APP_BACKEND_API_URL}/product/updateProduct/${editingProduct._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      } else {
        // Create new product
        response = await axios.post(
          `${process.env.REACT_APP_BACKEND_API_URL}/product/createItem`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      }

      console.log(isEditMode ? "Product updated successfully" : "Product listed successfully", response);
      
      // Reset form
      setProductTitle("");
      setProductDescription("");
      setProductImages([]);
      setImagePreviews([]);
      setExistingImages([]);
      setQuantity("");
      setPrice("");
      setSelectedCategory("");
      setSelectedSubcategory("");
      setSelectedBrand("");
      setSubcategories([]);
      setEditingProduct(null);
      setIsEditMode(false);
      
      // Close modals
      setCurrentModal(0);
      
      // Show success message
      toast.success(isEditMode ? "Product updated successfully!" : "Product listed successfully!");
      
      // Call callback to refresh product list
      if (onProductCreated) {
        onProductCreated();
      }
    } catch (error) {
      console.error(isEditMode ? "Error updating product" : "Error listing product", error);
      toast.error(error.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'list'} product. Please try again.`);
    }
  };

  // Function to handle category selection and fetch subcategories
  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);
    setSelectedSubcategory(""); // Reset subcategory when category changes

    if (selectedValue) {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_API_URL}/product/getSubCat?category=${selectedValue}`
        )
        .then((response) => {
          const fetchedSubcategories = response.data.subCategories;
          console.log(fetchedSubcategories);
          const subcategoryOptions = fetchedSubcategories.map((subcategory) => ({
            value: subcategory._id,
            label: subcategory.name,
          }));
          setSubcategories(subcategoryOptions);
        })
        .catch((err) => {
          console.error("Error fetching subcategories", err);
        });
    } else {
      setSubcategories([]);
    }
  };

  // Handle opening modals
  const openModal = (modalNumber) => {
    //get the product categories(heirarchical category data)
    if (modalNumber === 1) {
      axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/product/getCat`)
        .then((response) => {
          const fetchedCategories = response.data.categories || [];
          const categoryOptions = fetchedCategories.map((category) => ({
            value: category._id,
            label: category.name,
          }));
          // Update categories state with new options
          setCategories(categoryOptions);
        })
        .catch((err) => {
          console.error("Error fetching categories", err);
        });
    }
    setCurrentModal(modalNumber);
  };

  // Listen for custom event to open modal
  useEffect(() => {
    const handleOpenModal = () => {
      // Reset form for new product
      setIsEditMode(false);
      setEditingProduct(null);
      setProductTitle("");
      setProductDescription("");
      setProductImages([]);
      setImagePreviews([]);
      setExistingImages([]);
      setQuantity("");
      setPrice("");
      setSelectedCategory("");
      setSelectedSubcategory("");
      setSelectedBrand("");
      setSubcategories([]);
      openModal(1);
    };
    
    const handleOpenEditModal = async (event) => {
      const product = event.detail;
      setEditingProduct(product);
      setIsEditMode(true);
      
      // Pre-fill form with product data
      setProductTitle(product.title || "");
      setProductDescription(product.description || "");
      setQuantity(product.quantity?.toString() || "");
      setPrice(product.price?.toString() || "");
      
      // Handle existing images
      if (product.images && product.images.length > 0) {
        const imageUrls = product.images.map(img => 
          img.url ? `${process.env.REACT_APP_UPLOADS}${img.url}` : null
        ).filter(Boolean);
        setExistingImages(imageUrls);
        setImagePreviews([]); // Clear new image previews
      } else {
        setExistingImages([]);
        setImagePreviews([]);
      }
      
      const categoryId = product.category?._id || product.category || "";
      
      // Load categories first
      try {
        const categoriesResponse = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/product/getCat`);
        const fetchedCategories = categoriesResponse.data.categories || [];
        const categoryOptions = fetchedCategories.map((category) => ({
          value: category._id,
          label: category.name,
        }));
        setCategories(categoryOptions);
        
        // If product has a category, find parent category and load subcategories
        if (categoryId) {
          let parentCategoryId = null;
          
          // Check if categoryId is actually a parent category first
          const isParentCategory = fetchedCategories.some(cat => cat._id === categoryId);
          
          if (isParentCategory) {
            parentCategoryId = categoryId;
            setSelectedCategory(categoryId);
            setSelectedSubcategory(""); // If it's a parent, no subcategory
          } else {
            // It's likely a subcategory, need to find parent by checking each category's subcategories
            for (const category of fetchedCategories) {
              try {
                const subcategoriesResponse = await axios.get(
                  `${process.env.REACT_APP_BACKEND_API_URL}/product/getSubCat?category=${category._id}`
                );
                const fetchedSubcategories = subcategoriesResponse.data.subCategories || [];
                const foundSubcategory = fetchedSubcategories.find(sub => sub._id === categoryId);
                if (foundSubcategory) {
                  parentCategoryId = category._id;
                  setSelectedCategory(category._id);
                  setSelectedSubcategory(categoryId);
                  // Load subcategories for this parent
                  const subcategoryOptions = fetchedSubcategories.map((subcategory) => ({
                    value: subcategory._id,
                    label: subcategory.name,
                  }));
                  setSubcategories(subcategoryOptions);
                  break;
                }
              } catch (err) {
                // Continue to next category
                console.error(`Error fetching subcategories for category ${category._id}:`, err);
              }
            }
          }
          
          // If we found a parent category but haven't loaded subcategories yet, load them
          if (parentCategoryId && subcategories.length === 0) {
            try {
              const subcategoriesResponse = await axios.get(
                `${process.env.REACT_APP_BACKEND_API_URL}/product/getSubCat?category=${parentCategoryId}`
              );
              const fetchedSubcategories = subcategoriesResponse.data.subCategories || [];
              const subcategoryOptions = fetchedSubcategories.map((subcategory) => ({
                value: subcategory._id,
                label: subcategory.name,
              }));
              setSubcategories(subcategoryOptions);
            } catch (err) {
              console.error("Error loading subcategories:", err);
            }
          }
        }
      } catch (err) {
        console.error("Error loading categories for edit:", err);
      }
      
      // Open modal
      openModal(1);
    };
    
    window.addEventListener('openListModal', handleOpenModal);
    window.addEventListener('openEditModal', handleOpenEditModal);
    return () => {
      window.removeEventListener('openListModal', handleOpenModal);
      window.removeEventListener('openEditModal', handleOpenEditModal);
    };
  }, []);

  // Handle closing modals
  const closeModal = () => {
    setCurrentModal(0);
  };

  return (
    <div>
      {showEmptyState && (
        <div className="flex justify-center items-center flex-col text-center mt-10 min-h-72">
          <h2 className="text-2xl font-bold">My Store is Empty</h2>
          <p>There are no items listed.</p>
          <button
            onClick={() => openModal(1)}
            data-modal-target="crud-modal"
            data-modal-toggle="crud-modal"
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
          font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            List an item
          </button>
        </div>
      )}
      {/* ///////////////////////////////////first model */}
      {currentModal === 1 && (
        <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center">
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {isEditMode ? "Edit Product - Step 1" : "Create New Product - Step 1"}
                </h3>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 
                    ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <form className="p-4 md:p-5">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="product-category"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Product Category
                    </label>
                    <select
                      id="product-category"
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 
                        focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400
                        dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option value="">Select category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="product-subcategory"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Product Subcategory
                    </label>
                    <select
                      id="product-subcategory"
                      value={selectedSubcategory}
                      onChange={(e) => setSelectedSubcategory(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 
                        focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400
                        dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      disabled={!selectedCategory}
                    >
                      <option value="">Select subcategory</option>
                      {subcategories.map((subcategory, index) => (
                        <option key={index} value={subcategory.value}>
                          {subcategory.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="product-brand"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Brand
                    </label>
                    <select
                      id="product-brand"
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 
                        focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400
                        dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option value="">Select brand</option>
                      {/* Add brands based on the selected category */}
                    </select>
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => openModal(2)}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ////////////////////////////////////////////////////////////second model */}
      {currentModal === 2 && (
        <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center">
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {isEditMode ? "Edit Product" : "Create New Product"}
                </h3>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 
         ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <form className="p-4 md:p-5">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={productTitle}
                      onChange={(e) => setProductTitle(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 
             focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400
             dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type product name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Product Description
                    </label>
                    <textarea
                      id="description"
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                      rows="3"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300
             focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500
             dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write product description here"
                    ></textarea>
                  </div>
                  {/* Image drop zone */}
                  <div className="flex items-center justify-center w-full flex-col">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed 
             rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100
             dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        multiple
                        onChange={handleImageChange}
                        type="file"
                        className="hidden"
                      />
                    </label>

                    {/* Preview of existing images (when editing) */}
                    {existingImages.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Existing Images:</p>
                        <div className="grid grid-cols-2 gap-4">
                          {existingImages.map((imageURL, index) => (
                            <div key={index} className="relative">
                              <img
                                src={imageURL}
                                alt={`Existing ${index}`}
                                className="w-full h-32 object-cover rounded"
                              />
                              <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                                Current
                              </span>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          Upload new images to add to existing ones
                        </p>
                      </div>
                    )}
                    
                    {/* Preview of newly selected images */}
                    {imagePreviews.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">New Images:</p>
                        <div className="grid grid-cols-2 gap-4">
                          {imagePreviews.map((imageURL, index) => (
                            <img
                              key={index}
                              src={imageURL}
                              alt={`Preview ${index}`}
                              className="w-full h-32 object-cover rounded"
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => openModal(1)}
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => openModal(3)}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* ////////////////////////////////////////////////third model */}
      {currentModal === 3 && (
        <div>
          {/* <!-- Main modal --> */}
          <div
            id="crud-modal"
            tabIndex="-1"
            aria-hidden="true"
            className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full 
       md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {isEditMode ? "Edit Product" : "Create New Product"}
                  </h3>
                  {/* close button */}
                  <button
                    type="button"
                    onClick={closeModal}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 
               ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="crud-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* <!-- Modal body --> */}
                <form className="p-4 md:p-5">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label
                        for="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Quantity
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 
                  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400
                   dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Type product quantity"
                        required=""
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        for="price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 
                  focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400
                   dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Rs.2999"
                        required=""
                      />
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <button
                      onClick={() => openModal(2)}
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      {isEditMode ? "Update Product" : "List item"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListItemsModel;
