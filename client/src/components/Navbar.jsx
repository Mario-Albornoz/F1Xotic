import React, { useEffect, useState } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import { gsap } from 'gsap'; // Import GSAP
import { dropDownAnimation } from '../utils/animations';


const Navbar = () => {

    const navBarAnimation = () => {
        //animation for nav bar shifts the bar from outisde the screen into its final position
        gsap.fromTo(
            "header", //trager the navbar wrapper
            {
                y:"-100%"
            },
            {
                y: "0%",
                duration: 1,
                ease: "power4.out"
            }
        );
    }

    //use nava bar animation when loading the screen
    useEffect(() => {
        navBarAnimation();    
      }, []);

    //event bubbeling for handle event listener for nav bar animation
    const handleNavLinkClick = (e) =>{
        if(e.target.innerText == "Shopping Cart"){
            navBarAnimation();
        }
    }

    //keep track of location to alter the color on the text of the nav bar
    const location = useLocation();

  return (
    <header className='navBar-Heading sticky top-0' onClick={handleNavLinkClick}>
        {/* logo */}
        <NavLink to='/' className="flex items-center justify-center outline-2 p-2 rounded-lg">
            <img src="/img/F1xotics_Logo.png" alt="F1Xotics Logo" className='h-15 w-auto p-0 m-0' />
        </NavLink>

        {/* Nav section right column */}
        <nav className={`flex gap-7 text-base font-semibold transition-colors duration-1000 ${
            // tried changing the fonr based on the url location, but changing the active color when /product breaks the page. It breaks the 3D model and the DOM in the hoempage.
            location.pathname==='/order-history'
                ? 'text-black' // Active color when on /products or /product
                : 'text-white'
                }`}>

            <NavLink  to='/shop' className="p-2">
                Products
            </NavLink>

            <NavLink to='/shopping-cart' className="p-2">
                Shopping Cart
            </NavLink>

            <NavLink  to='/log-in'   className="border-2 rounded-lg p-2">
                Log-in
            </NavLink>
            <button onClick={() => localStorage.removeItem('token')} className="border-2 rounded-lg p-2">
                Sign Out
            </button>
        </nav>
    </header>
  )
}

export default Navbar