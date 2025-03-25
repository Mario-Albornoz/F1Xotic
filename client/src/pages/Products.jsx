import React, { useEffect, useState, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { gsap } from 'gsap'; 
import { dropDownAnimation } from '../utils/animations';
import  { fetchProducts, createProduct } from '../api/api.js'


const Products = () => {
  const selectedRef = useRef();
  const [isAnimationisActive, setAnimationisActive] = useState(true);
  const [isHovered, setIsHovered] = useState(false)
  const [count, setCount] = useState(0)
  const [isProdAddVisible, setIsProdAddVisible] = useState(false)
  const [products, setProducts] = useState([])
  const image = "/img/F1CarImages/Mclaren2024.jpg";


  const changeColorAndShowProductCreationCard = () => {
    setIsProdAddVisible(prev => !prev);
    setIsHovered(prev => !prev);
  }

    // drop down effect on the product cards
     useEffect(() => {
      dropDownAnimation("20%", "0%", 2, null , selectedRef.current);


       //fetch products from backend
      fetchProducts().then(setProducts);
    }, []);

  return (
    <div className='login-bg h-screen w-screen '>
      {/* add product button */}
      <div className=' absolute flex w-full px-17 items-bottom justify-start mt-33'>
        {/* transition colors when hovering over the button */}
        <button 
          className={`transition-colors duration-1000 z-20
          ${isHovered ? "outline outline-2 outline-black !bg-white !text-black" : "outline outline-2"}`} 
          onClick={()=>changeColorAndShowProductCreationCard()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          >
          {isProdAddVisible ? <p>Back to Shop </p>: <p>Add product</p>}
          
        </button>
      </div>
      
      {isProdAddVisible ? <AddProductCard/> : 
      <section ref={selectedRef} className='grid grid-cols-3 px-2 py-10 place-items-center gap-11'>
      {(products.map((product, index) => (
        <ProductCard 
          key={index}
          id={product._id}
          name={product.name}
          category={product.category}
          image={image}   //{product.image}
          description={product.description}
          />)))}
      </section>
      }
    </div>
  )
}

const InfoBox = ({description}) => {
  return(
    <div className='bg-white h-full w-full p-2'>
      <p className='text-left text-black font-extralight '>
        {description}
      </p>
    </div>
  )
}


const AddProductCard = ({ name = '', category = '', image = '', description = '', price = '', breakdown = '' }) => {
  const [productData, setProductData] = useState({ name, category, image, description, price, breakdown });
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const addProduct = async () => {
    setIsLoading(true);
    setError(null); // Reset error message
    try {
      const newProduct = await createProduct(productData);
      console.log("Product added successfully:", newProduct);
      // Optionally, reset the form or navigate to another page
    } catch (error) {
      setError(error.message);
      console.error("Error adding product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="absolute flex items-center justify-center h-screen w-screen px-20 login-bg">
      <div className="h-auto w-1/3 mt-10 bg-white p-6 rounded-lg shadow-lg outline outline-black">
        <h2 className="text-xl font-bold mb-4 text-black">Add New Product</h2>
        <div className="flex flex-col gap-3">
          <input
            className="product-input-box-text border p-2 rounded"
            type="text"
            name="name"
            placeholder="Product Name"
            value={productData.name}
            onChange={handleChange}
          />
          <input
            className="product-input-box-text border p-2 rounded"
            type="text"
            name="category"
            placeholder="Category"
            value={productData.category}
            onChange={handleChange}
          />
          {/* <input className="product-input-box-text border p-2 rounded" type="text" name="image" placeholder="Image URL" value={productData.image} onChange={handleChange} /> */}
          <textarea
            className="product-input-box-text border p-2 rounded"
            name="description"
            placeholder="Description"
            value={productData.description}
            onChange={handleChange}
          />
          <input
            className="product-input-box-text border p-2 rounded"
            type="number"
            name="price"
            placeholder="Price"
            value={productData.price}
            onChange={handleChange}
          />
          <textarea
            className="product-input-box-text border p-2 rounded"
            name="breakdown"
            placeholder="Breakdown: Short description"
            value={productData.breakdown}
            onChange={handleChange}
          />
          <button
            className="text-white p-2 rounded mt-3 hover:bg-gray-500"
            onClick={addProduct}
            disabled={isLoading}
          >
            {isLoading ? 'Adding Product...' : 'Add Product'}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    </section>
  );
};


// product card to display products based on their fields
const ProductCard = ({id, name, category, image, description}) => {
  const [isHovered, setIsHovered] = useState(false);

  return(

    <NavLink to = {`/shop/product/${id}`}>
      <section 
      className='relative flex flex-col justify-between items-center gap-2 mt-40'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      >         
        <div className='relative block font-serif'>
            {isHovered ? <InfoBox description={description}/> : <img src={image} alt="product image" className=' w-full h-full'/>}
              <p className={`card-text transition-colors duration-200  ${ isHovered ? "text-black" : "text-white"}`}>
                {name} <br/>
                 <span className='text-lg'> {category} </span>
              </p> 
         </div> 
      </section>
    </NavLink>
  )
}




export default Products