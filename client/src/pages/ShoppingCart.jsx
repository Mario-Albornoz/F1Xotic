import { useEffect, useRef, useState } from "react";
import { dropDownAnimation } from "../utils/animations";
import { NavLink } from "react-router-dom";
import { deleteOrderItem, fetchOrderItems, createOrder } from "../api/api";

const ShoppingCart = () => {
  const selectedRef = useRef();
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");


  useEffect(() => {
    dropDownAnimation("20%", "0%", 0.75, null, selectedRef.current);

    fetchOrderItems().then(setOrders);
  }, []);
  // Function to remove order item
  const handleRemoveOrder = async (id) => {
    try {
      await deleteOrderItem(id);
      // Refresh the cart after deletion
      const updatedOrders = await fetchOrderItems();
      setOrders(updatedOrders);
    } catch (err) {
      console.error("Error removing order item:", err);
    }
  };

  // Function to create order with item IDs
  const handleCreateOrder = async () => {
    if (!orders) return;

    // Create an array of order IDs
    let orderIds = orders.map(order => order._id);

    try {
      const orderData = {
        items: orderIds
      };
      
      await createOrder(orderData);
      setMessage("Order Created Successfully!")
      // delete order items to reset the shopping cart
      await Promise.all(orders.map(order => deleteOrderItem(order._id)));
      setOrders([]);
    } catch (err) {
      console.error("Error creating order:", err);
    }
  };


  return (
    <section className="relative shopping-cart-bg h-full w-full px-14 py-16 items-center justify-center">
      <div className="flex justify-between border-b-2 decoration-white mt-10 py-10 pb-4 items-end pr-5">
        <h1 className="text-7xl">Shopping Cart</h1>
        <NavLink className="bottom-0 items-baseline" to="/order-history">
          Go to Order history
        </NavLink>
      </div>
      <div ref={selectedRef} className="flex flex-col h-auto w-full p-4 gap-7 rounded-md">
        {orders.map((order, index) => (
          <OrderCard
            key={index}
            id={order._id} // Ensure correct ID
            product={order.product} 
            quantity={order.quantity}
            price={order.subTotal} // Ensure proper subtotal
            removeOrder={() => handleRemoveOrder(order._id)} // Pass function to remove item (not functioning for now)
          />
        ))}
      </div>
      <div className="flex items-center justify-end p-4 gap-10">
        <button className="flex items-center h-20" onClick={handleCreateOrder}>
            Check out
        </button> 
        {/* display success message */}
        {message && <p className="text-lg">{message}</p>}
      </div>
    </section>
  );
};



// Order card component
const OrderCard = ({product,quantity, price, id, removeOrder }) => {
  return (
    <div className="flex h-40 px-4 p-4 items-center justify-between text-black outline-1 bg-white/80 rounded-md">
      {/* Left column */}
      <div className="flex flex-col h-full items-start justify-center gap-5">
        
          <div>
            <h1 className="text-2xl">Product: {product.name}</h1>
            <h2 className="font-extralight">Breakdown: {product.breakdown}</h2>
          </div>
       
        <h2>Quantity: {quantity}</h2>
      </div>
      {/* Right column */}
      <div className="flex flex-col h-full items-start justify-center gap-8">
        <button className="flex items-center h-1/6" onClick={() => removeOrder(id)}>
          Remove
        </button>
        <h2>Total Amount: ${price}</h2>
      </div>
    </div>
  );
};

export default ShoppingCart;
