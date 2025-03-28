import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";


//only allows autheticated users to create the order
export const createOrder = async (req, res) => {
    try {
        const { items } = req.body;
        const userId = req.user.id; 
        let prices = [];

        //get subtotal from the order items and add them to define the total for the order
        for (let i = 0; i < items.length; i++) {
            const orderItemInstance = await OrderItem.findById(items[i]);
            
            if (!orderItemInstance) {
                return res.status(404).json({ message: `OrderItem with ID ${items[i]} not found` });
            }

            prices.push(orderItemInstance.subTotal);
        }

        const totalAmount = prices.reduce((acc, curr) => acc + curr, 0); 

        //Pass caluclated values
        const order = new Order({ user: userId, items, totalAmount });
        await order.save();

        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: "Error creating order", error: err.message });
    }
};

export const getOrders = async (req, res) => {
    try {
        const userId = req.user.id
        const orders = await Order.find({user: userId})
        // .populate({
        //     path: 'items',
        //     populate: {
        //         path: 'product', // Populate the product field inside OrderItem
        //         model: 'Product', // Specify the model for the product
        //     }
        // })
        // .populate("user");
        
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: "Error fetching orders", error: err.message });
    }
};