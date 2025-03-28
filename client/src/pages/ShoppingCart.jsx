import { useEffect, useRef, useState } from "react";
import { dropDownAnimation } from "../utils/animations";
import { NavLink } from "react-router-dom";
import { deleteOrderItem, fetchOrderItems, createOrder } from "../api/api";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const ShoppingCart = () => {
  const selectedRef = useRef();
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [isCheckout, setIsCheckout] = useState(false); // Toggle PayPal checkout

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

  // Function to create order
  const handleCreateOrder = async () => {
    if (!orders.length) return;

    let orderIds = orders.map(order => order._id);

    try {
      const orderData = { items: orderIds };
      await createOrder(orderData);
      setMessage("Order Created Successfully!");

      // Clear cart after order
      await Promise.all(orders.map(order => deleteOrderItem(order._id)));
      setOrders([]);
    } catch (err) {
      console.error("Error creating order:", err);
    }
  };

  // Calculate total price dynamically
  const totalAmount = orders.reduce((total, order) => total + order.subTotal, 0).toFixed(2);

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
            id={order._id}
            product={order.product} 
            quantity={order.quantity}
            price={order.subTotal}
            removeOrder={() => handleRemoveOrder(order._id)}
          />
        ))}
      </div>

      <div className="flex flex-col items-end p-4 gap-6">
        <h2 className="text-3xl font-bold">Total: ${totalAmount}</h2>
        <button className="flex items-center h-20 bg-blue-500 text-white px-5 py-3 rounded-md" onClick={() => setIsCheckout(true)}>
          Check out
        </button>

        {isCheckout && (
          <div className="mt-4 w-full">
            <PayPalCheckout
              amount={totalAmount} 
              onSuccess={handleCreateOrder} 
            />
          </div>
        )}

        {message && <p className="text-lg text-green-500">{message}</p>}
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

//handle paypal transactions with paypal sandbox, passing the amount of the shooping cart 
const PayPalCheckout = ({ amount, onSuccess }) => {
  return (
    <PayPalScriptProvider options={{ "client-id": "AR6it4PFa5onX4kwSNV1UPo-0NUvvW7k2oz1p_wjxuCJ5HoALnX4Lsx6eZRrhd3YZdD_Z8l2aVfkZwLr", currency: "USD" }}>
      <PayPalButtons 
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: amount }, 
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            alert("Transaction completed by " + details.payer.name.given_name);
            onSuccess(); // Trigger order creation in backend
          });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default ShoppingCart;
