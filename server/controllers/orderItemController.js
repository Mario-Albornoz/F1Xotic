import OrderItem from "../models/OrderItem.js";
import Product from "../models/Product.js";

export const createOrderItem = async (req, res) => {
    try {

        const userId = req.user.id;
        const { product, quantity} = req.body;

        //get subtotal from the price listed on the product
        const productInstance = await Product.findById(product);
        if (!productInstance) {
            return res.status(404).json({ message: "Product not found" });
        }

        const productPrice = productInstance.price
        const subtotal = productPrice * quantity

        const orderItem = new OrderItem({ user: userId, product, quantity, subTotal:subtotal});
        await orderItem.save();

        res.status(201).json(orderItem);
    } catch (err) {
        res.status(500).json({ message: "Error creating order item", error: err.message });
    }
};

//get all order items for the user
export const getOrderItems = async (req, res) => {
    try {
        const userId = req.user.id;
        const orderItems = await OrderItem.find({user: userId}).populate("product").populate("user");
        res.json(orderItems);
    } catch (err) {
        res.status(500).json({ message: "Error fetching order items", error: err.message });
    }
};

//delete orderitem
export const removeOrderItem = async (req, res) => {
    try {
        await OrderItem.findByIdAndDelete(req.params.id);
        res.json({ message: "Cart item removed successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error removing cart item", error: err.message });
    }
};