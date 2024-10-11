const Product = require('../models/ProductModel');

exports.createProduct = async(req, res) => {
    try{
        console.log("Request is ", req.body.formData);


        res.status(200).json({
            message: "Product created successfully..!"
        })
    }catch(error){
        console.error("Error with creating products ", error);
        res.status(500).json({ message: "Error creating products", error: error.message })
    }

}