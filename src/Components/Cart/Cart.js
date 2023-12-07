
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAPIContext } from '../Data/apiContextData';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Cart({ cart, setCart, login, user, closeCart }) {

  const { products } = useAPIContext();
  const [total, setTotal] = useState(0);
  const cartProducts = products.filter((product) => cart.includes(product.id));

  const [productQuantities, setProductQuantities] = useState(
    cartProducts.reduce((quantities, product) => {
      quantities[product.id] = 1;
      return quantities;
    }, {})
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    setIsAuthenticated(login);
  }, [login]);

  const handleCheckout = async () => {
    console.log('Handle Checkout Clicked');
    try {
      const checkoutPromises = cartProducts.map((product) => {
        return fetch('https://bloom-beauty.onrender.com/invoices', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: user.id,
            product_id: product.id,
            cost: product.price,
            quantity: productQuantities[product.id] || 1,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to create invoice item for product ID ${product.id}`);
            }
            return response.json(); // Assuming the response is JSON
          })
          .catch((error) => {
            console.error('Error during checkout:', error);
            toast.error('Error during checkout:', error);
            return;

          });
      });

      const results = await Promise.all(checkoutPromises);
      toast.success("Order placed successfully!")
      console.log('Checkout results:', results);


      // Clear the cart after successful checkout
      setCart([]);
      setProductQuantities({});
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };


  const handleCheckout1 = () => {
    alert('Checkout button clicked!');
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setProductQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,

    }));
    let newTotal = 0;
    cartProducts.forEach(product => {
      newTotal += product.price * productQuantities[product.id];
    });

    setTotal(newTotal);
  };

  const handleRemoveFromCart = (productId) => {

    const updatedCart = cart.filter((id) => id !== productId);
    setCart(updatedCart);
  };


  return (


    <section className="py-4 sm:py-16">
      <button onClick={closeCart} className="close-cart text-gray-600 hover:text-gray-800 absolute top-4 right-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="container mx-auto px-4">
        <div className="shadow-lg my-10 bg-white p-4 rounded-lg">
          <h1 className="font-semibold text-2xl border-b pb-4 text-indigo-700">Order Summary</h1>
          <div className="flex justify-between mt-4">
            <span className="font-semibold text-sm text-gray-700 uppercase">Items: {cartProducts.length}</span>
            <span className="font-semibold text-sm text-red-500">${total}</span>
          </div>
          <div className="mt-4">
            <label className="font-medium text-sm text-gray-700 uppercase">Shipping</label>
            <select className="block p-2 text-gray-600 w-full text-sm bg-indigo-100">
              <option>Standard shipping - $10.00</option>
            </select>
          </div>
          <div className="border-b mt-4"></div>
          <div className="flex mt-4">
            <div className="w-2/5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase">Product Details</h3>
            </div>
            <div className="w-1/5">
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase">Quantity</h3>
            </div>
            <div className="w-1/5">
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase">Price</h3>
            </div>
            <div className="w-1/5">
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase">Total</h3>
            </div>
          </div>
          {cartProducts.map((product) => (
            <div key={product.id} className="flex items-center hover:bg-indigo-100 -mx-4 px-4 py-2">
              <div className="flex w-2/5">
                <div className="w-20">
                  <img
                    className="h-24 w-24 object-cover rounded-lg shadow-md"
                    src={product.image}
                    alt="Product Image"
                  />
                </div>
                <div className="flex flex-col ml-4 flex-grow">
                  <span className="font-bold text-sm text-gray-800">{product.p_name}</span>
                  <span className="text-red-500 text-xs">Apple</span>
                  <a href="#" className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                    onClick={() => handleRemoveFromCart(product.id)}>Remove</a>
                </div>
              </div>
              <div className="flex justify-center w-1/5">
                <button
                  className="text-gray-600 w-6 cursor-pointer bg-indigo-100 hover:bg-indigo-200 rounded-full"
                  onClick={() =>
                    handleQuantityChange(product.id, productQuantities[product.id] + 1)
                  }
                >
                  +
                </button>
                <input
                  className="mx-2 border text-center w-8"
                  type="number"
                  value={productQuantities[product.id] || 1}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value, 10);
                    handleQuantityChange(
                      product.id,
                      newValue < 1 ? 1 : newValue
                    );
                  }}
                  min="1"
                />
                <button
                  className="text-gray-600 w-6 cursor-pointer bg-indigo-100 hover:bg-indigo-200 rounded-full"
                  onClick={() =>
                    handleQuantityChange(
                      product.id,
                      productQuantities[product.id] > 1
                        ? productQuantities[product.id] - 1
                        : 1
                    )
                  }
                >
                  -
                </button>
              </div>
              <div className="text-center w-1/5 font-semibold text-sm text-gray-800">${product.price}</div>
              <div className="text-center w-1/5 font-semibold text-sm text-red-500">
                ${product.price * productQuantities[product.id]}
              </div>
            </div>
          ))}
          <div className="py-4">
            <label htmlFor="promo" className="font-semibold text-sm text-gray-700 uppercase">Promo Code</label>
            <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full bg-indigo-100 rounded" />
          </div>
          <button
            onClick={handleCheckout1}
            className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase w-full rounded">
            Apply
          </button>
          <div className="border-t mt-4"></div>
          <div className="flex font-semibold justify-between py-4 text-sm uppercase">
            <span className="text-gray-700">Total cost</span>
            <span className="text-red-500">${total}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="bg-indigo-500 hover:bg-indigo-600 px-5 py-3 text-sm text-white uppercase w-full rounded">
            Checkout
          </button>
          <ToastContainer />
        </div>
      </div>
    </section>



  )
}

export default Cart
