import { useCart } from "@/Context";
import ModalTwo from "@/Components/ModalTwo";
import React, { useState } from "react";
import ModalThree from "@/Components/ModalThree";

const TotalCart = () => {
  const { cart, removeFromCart } = useCart();
  const [open, setOpen] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      {open && (
        <ModalTwo
          open={open}
          setOpen={setOpen}
          setSuccessModal={() => setSuccessModal(true)}
        />
      )}
      {successModal && (
        <ModalThree open={successModal} setOpen={setSuccessModal} />
      )}
      <h1 className="text-3xl font-bold mb-4">Total Cart</h1>
      {cart.map((item, index) => (
        <div key={index} className="border-b pb-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{item.brand}</h2>
              <p className="text-gray-600">
                ${item.price} (Quantity: {item.quantity})
              </p>
            </div>
            <button
              className="text-red-500 hover:text-red-700 focus:outline-none"
              onClick={() => removeFromCart(index)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      {/* Display total price */}
      <div className="mt-4 text-xl font-semibold">
        Total Price: ${totalPrice.toFixed(2)}
      </div>
      {totalPrice > 0 ? (
        <div
          onClick={() => setOpen(true)}
          className="bg-blue-500 w-fit cursor-pointer text-white px-6 mt-4 py-2 rounded"
        >
          Place Order
        </div>
      ) : (
        <div className="tracking-[1.2px] mt-4">
          Please add Few Items to place an order go to :{" "}
          <a className="underline text-blue-600" href="/">
            HomePage
          </a>
        </div>
      )}
    </div>
  );
};

export default TotalCart;
