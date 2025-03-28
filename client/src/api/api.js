import axios from 'axios';

// Base URL for the API
const API_BASE_URL = "http://localhost:1337/api"; // Change this based on your backend URL

// Helper function to get the token from localStorage or sessionStorage
const getToken = () => {
  return localStorage.getItem('token'); // Assuming token is stored in localStorage
};

// Create an axios instance with a pre-configured base URL
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Add a request interceptor to include the token in headers for authenticated requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken(); // Retrieve token 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Register user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Fetch all products
export const fetchProducts = async () => {
  const response = await axiosInstance.get('/products/');
  return response.data;
};

// Create a new product
export const createProduct = async (productData) => {
  const response = await axiosInstance.post('/products/create', productData);
  return response.data;
};

// Fetch a single product by ID
export const fetchProductById = async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};
// Delete a product
export const deleteProduct = async (id) => {
  await axiosInstance.delete(`/products/${id}`);
};
//fetch products by name
export const fetchProductByName = async (name) => {
  try {
    const response = await axiosInstance.get('/products/search', {
      params: { name }
    });
    return response.data; // Return the fetched products
  } catch (error) {
    console.error("Error fetching products by name:", error.message);
    throw error; // Optionally throw the error for further handling in the component
  }
};
//Fetch order history
export const fetchOrderHistory = async () => {
    const response = await axiosInstance.get('/orders/');
    return response.data;
}

//create order 
export const createOrder = async (orderData) => {
    const response = await axiosInstance.post('/orders/create', orderData);
    return response.data
}

//fetch orderItems
export const fetchOrderItems = async () =>{
    const response = await axiosInstance.get('/order-items/');
    return response.data
}

//create orderItems
export const createOrderItem = async (orderItemData) =>{
    const response = await axiosInstance.post('/order-items/create', orderItemData);
    return response.data
}

//delete a orderItem
export const deleteOrderItem = async (id) => {
    await axiosInstance.delete(`/order-items/${id}`)
}







