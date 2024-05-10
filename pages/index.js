import React, { useState } from "react";
import { GetProductData } from "./api/product";
import { useRouter } from "next/router";
import { useCart } from "@/Context";
import ModalOne from "@/Components/ModalOne";

const Index = (props) => {
  const { cart, addToCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const [notification, setNotification] = useState(null); // State for notification message
  const data = useState(props.productData.products);
  const [open, setOpen] = useState(false);
  const router = useRouter();




  const handleAddToCart = (product) => {
    addToCart(product);
    setTotalPrice(totalPrice + product.price);
    setNotification(`${product.brand} added to cart!`); // Set notification message
    setTimeout(() => {
      setNotification(null); // Clear notification after some time
    }, 3000); // Clear after 3 seconds
  };

  // Calculate total quantity of items in cart
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      {open && <ModalOne open={open} setOpen={setOpen} />}
      <div className="flex justify-between items-center border-blue-100 border-b py-2 px-6">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <div
          className="cursor-pointer border-blue-100 font-semibold border px-4 rounded-lg flex items-center"
          onClick={() => setOpen(true)}
        >
          Check Total
          <img src="/cart.png" className="mx-2" alt="Cart" />
          <span className="text-black font-semibold">
            {totalQuantity} items
          </span>
        </div>
      </div>

      
      {/* Notification */}
      {notification && (
        <div
          className="bg-green-200 border-l-4 border-green-500 text-green-700 px-4 py-3 mt-4"
          role="alert"
        >
          <p>{notification}</p>
        </div>
      )}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 mt-6 grid-cols-1 gap-4">
        {data[0]?.map((product, index) => (
          <div key={index} className="border border-blue-100 p-4">
            <div>
              <img
                src={product.images[2]}
                className="h-40"
                alt={product.brand}
              />
            </div>
            <h2>{product.brand}</h2>
            <p>Price: ${product.price}</p>
            <button
              className="bg-blue-500 text-white px-2 mt-2 py-1 rounded"
              onClick={() => {
                handleAddToCart(product);
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;

export async function getServerSideProps() {
  const res = await fetch(`https://dummyjson.com/products`);
  const productData = await res.json();
  return { props: { productData } };
}
