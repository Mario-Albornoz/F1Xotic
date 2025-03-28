import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

import { dropDownAnimation } from "../utils/animations";
import { fetchOrderHistory } from "../api/api";

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {

      //fetch order history
      fetchOrderHistory().then(setOrders);
    }, []);
    
      return (
        <section className="relative top-0 w-screen h-screen white-to-gray-gradient px-14 py-16 items-center justify-center">
            <div className="flex justify-between border-b-2 text-black decoration-black mt-10 py-10 pb-4 items-end pr-5">
                <h1 className="text-7xl ">
                    Order History
                </h1>
                <NavLink className="bottom-0 items-baseline" to="/shopping-cart">
                    Go back to shopping-cart
                </NavLink>
            </div>
          <div className="flex flex-col h-auto w-full p-4  gap-7 rounded-md">
            {orders.map((order,index) => (
              <OrderCard
                key={index}
                id={order._id}
                price={order.totalAmount}
              />
            ))}
          </div>
        </section>
      );
    };


const OrderCard = ({ price, id}) => {
    const selectedDiv = useRef();

    useEffect(()=>{
        dropDownAnimation("40%", "0%",0.75, null ,selectedDiv.current)
    })

    return (
      <div ref={selectedDiv} className="flex h-40 px-4 p-4 items-center justify-between text-black outline-1 bg-white/80 rounded-md">
        {/* left column of the card */}
        <div className="flex flex-col h-full items-start justify-center gap-5">
            <p className="text-sm">Order-Id: {id}</p>
        </div>
        {/* right column of the card */}
        <div className="flex flex-col h-full items-start justify-center gap-8">
          
          {/* Add later on buy again feature
          <NavLink className="flex items-center p-3 h-1/6 text-white bg-black rounded-md" to="/">
            Buy again
          </NavLink> */}
          <h2>Total Amount: {price}$</h2>
        </div>
      </div>
    );
  };
export default OrderHistory