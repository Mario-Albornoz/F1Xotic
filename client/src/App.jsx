import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import { Products, Product, Home} from './pages';
import ShoppingCart from './pages/ShoppingCart';
import OrderHistory from './pages/OrderHistory';
import Login from './pages/Login';
import RegisterOrLogin from './pages/Login';



const App = ()=>{
  return(
    <main >
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/log-in" element={<RegisterOrLogin/>}/>
          <Route path="/shop" element={<Products/>}/>
          <Route path="shop/product/:id" element={<Product/>}/>
          <Route path="/shopping-cart" element={<ShoppingCart/>}/>
          <Route path="/order-history" element={<OrderHistory/>}/>
        </Routes>
      </Router>
    </main>
  );
};

export default App
