import Product from "../models/Product.js";


export const createProduct = async (req, res) =>{
    try{
        const userId = req.user.id;
        const {name, price, category, description, breakdown, image} = req.body;
        const newProduct = new Product ({name, price, user: userId, category, description, breakdown, image});

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ message: "Error creating product", error: err.message });
    }
}

//GET REQUEST
export const getAllProducts = async (req, res) =>{
    try{
        const products = await Product.find();
        res.json(products);
    } catch(err){
        res.status(500).json({ message: "Error fetching products", error: err.message });
    }
}

//GET PRODUCT BY ID FOR THE INDIVIDUAL PRODUCT PAGE
export const getProductById = async (req, res) =>{
    try{
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        res.json(product);
    } catch(err){
        res.status(505).json({message: "Error fetching product", error: err.message})
    }
}

//PATCH PRODUCT
export const updateProduct = async (req, res) => {
    try{
        const userId = req.user.id;
        const { name, price, category, description, breakdown, image } = req.body;

        //check if current user is the creator of the product
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        //return unauthorized
        if(product.user.toString() !== userId) return res.status(403).json({ message: "You are not authorized to update this product" });
    

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, category, description, breakdown},
            { new: true } // Return updated document
        );

        if(!updatedProduct) return res.status(404).json({message:"Product doesn't exist", error:err.message})
        
        
        res.json(updatedProduct);
    } catch(err){
        res.status(505).json({message: "Error updating product", error: err.message})
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check if current user is the owner of the product
        if (product.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to delete this product" });
        }

        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting product", error: err.message });
    }
};

export const searchProductsByName = async (req, res) => {
    try {
        const { name } = req.query; // Get the name from query params
        if (!name) {
            return res.status(400).json({ message: "Please provide a product name" });
        }

        // Use a case-insensitive search with regex
        const products = await Product.find({ name: { $regex: name, $options: "i" } });

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: "Error searching for products", error: err.message });
    }
};