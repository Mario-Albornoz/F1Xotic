import { useEffect, useRef, useState } from "react";
import { dropDownAnimation } from "../utils/animations";
import { NavLink } from "react-router-dom";
import { deleteOrderItem, fetchOrderItems } from "../api/api";

const ShoppingCart = () => {
  const selectedRef = useRef();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    dropDownAnimation("20%", "0%", 0.75, null, selectedRef.current);

    fetchOrderItems().then(setOrders);
  }, []);

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
            products={order.product} // Pass the product array
            quantity={order.quantity}
            price={order.subTotal} // Ensure proper subtotal
            removeOrder={() => handleRemoveOrder(order._id)} // Pass function to remove item
          />
        ))}
      </div>
    </section>
  );
};

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

// Order card component
const OrderCard = ({ products, quantity, price, id, removeOrder }) => {
  return (
    <div className="flex h-40 px-4 p-4 items-center justify-between text-black outline-1 bg-white/80 rounded-md">
      {/* Left column */}
      <div className="flex flex-col h-full items-start justify-center gap-5">
        {products.map((product, index) => (
          <div key={index}>
            <h1 className="text-2xl">Product: {product.name}</h1>
            <h2 className="font-extralight">Breakdown: {product.breakdown}</h2>
          </div>
        ))}
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
