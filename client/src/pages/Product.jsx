import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createOrderItem, fetchProductById } from "../api/api";

const Product = () => {
  const { id } = useParams(); // Get the product ID from URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Default quantity
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // Feedback message

  useEffect(() => {
    fetchProductById(id)
      .then(setProduct)
      .catch((err) => console.error(err));
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;

    setLoading(true);
    setMessage("");

    try {
      const orderItemData = {
        product: product._id, // Send product ID
        quantity,
      };

      await createOrderItem(orderItemData);
      setMessage("Added to cart successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to add to cart.");
    } finally {
      setLoading(false);
    }
  };

  if (!product)
    return (
      <div className="product-bg flex h-full w-full items-center justify-center">
        <p className="items-center">Loading product...</p>
      </div>
    );

  return (
    <section className="product-bg flex h-full w-full items-center justify-between p-25 gap-7">
      {/* Product description */}
      <div className="product-description-container flex flex-col justify-start items-start py-15 px-15 gap-20 font-serif">
        <h1 className="font-extrabold text-4xl">{product.name}</h1>
        <h2 className="font-semibold text-3xl">
          Price: <span className="text-2xl">${product.price}</span>
        </h2>
        <h2 className="font-semibold text-3xl">
          Description
          <p className="font-medium text-xl py-4">{product.description}</p>
        </h2>

        {/* Quantity Selector */}
        <div className="flex items-center gap-2">
          <button
            className="bg-gray-200 px-3 py-1 rounded-md"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            -
          </button>
          <span className="text-xl font-medium">{quantity}</span>
          <button
            className="bg-gray-200 px-3 py-1 rounded-md"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          className="flex items-center h-10 rounded-md bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 disabled:bg-gray-400"
          onClick={handleAddToCart}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add to Cart"}
        </button>

        {/* Display success/error message */}
        {message && <p className="mt-2 text-lg">{message}</p>}
      </div>

      {/* Product image */}
      <img src={product.image} alt={product.name} className="product-image" />
    </section>
  );
};

export default Product;
