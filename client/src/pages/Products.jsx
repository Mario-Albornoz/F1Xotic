import React, { useEffect, useState, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { gsap } from 'gsap'; 
import { dropDownAnimation } from '../utils/animations';
import  { fetchProducts, createProduct, fetchProductByName } from '../api/api.js'


const Products = () => {
  const selectedRef = useRef();
  const [isAnimationisActive, setAnimationisActive] = useState(true);
  const [isHovered, setIsHovered] = useState(false)
  const [count, setCount] = useState(0)
  const [isProdAddVisible, setIsProdAddVisible] = useState(false)
  const [products, setProducts] = useState([])


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

  // Handle search from SearchBar if no query return all items
  const handleSearch = (query) => {
    if (!query){
      fetchProducts().then(setProducts)
    }else{
    fetchProductByName(query)
      .then((data) => {
        setProducts(data); // Update the products state with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
    }
  };

  return (
    <div className='login-bg h-screen w-screen '>
      {/* add product button */}
      <div className=' absolute flex w-full px-17 items-bottom justify-between mt-33 h-10 z-20'>
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

        <SearchBar onSearch={handleSearch} />
      </div>
      {isProdAddVisible ? <AddProductCard/> : 
      <section ref={selectedRef} className='grid grid-cols-3 px-2 py-20 place-items-center gap-11'>
      {(products.map((product, index) => (
        <ProductCard 
          key={index}
          id={product._id}
          name={product.name}
          category={product.category}
          image={product.image}   //{product.image}
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
          {/* Give users the option to pick the image for their car */}
          <input 
            className="product-input-box-text border p-2 rounded" 
            type="text" 
            name="image" 
            placeholder="Select or enter an image URL" 
            value={productData.image} 
            onChange={handleChange} 
            list="image-options"
          />

          <datalist id="image-options">
            <option value="/img/F1CarImages/Ferrari1960.jpg">Ferrari 1960</option>
            <option value="/img/F1CarImages/McLaren2024.jpg">McLaren MP24</option>
            <option value="/img/F1CarImages/RedBull2024.jpg">Red Bull RB24</option>
            <option value="/img/F1CarImages/Mercedes2024.jpg">Mercedes WC24</option>
            <option value="/img/F1CarImages/Lotus1960.jpg">Mercedes WC24</option>
            <option value="/img/F1CarImages/Renault2005.jpg">Mercedes WC24</option>
          </datalist>

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

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(query); 
  };

  return (
    <div className="flex items-center justify-center p-4">
      <form onSubmit={handleSearch} className="flex items-center w-full max-w-sm">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search..."
          className="w-full p-2 border border-gray-300 rounded-l-md focus:outline-none"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none"
        >
          Search
        </button>
      </form>
    </div>
  );
};



export default Products