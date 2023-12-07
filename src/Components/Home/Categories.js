import React, { useState, useEffect } from "react";

function Categories() {
  const [time, setTime] = useState(new Date());
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      setTime(new Date());
    }, 10000);

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <>
      <div >
        <div class="flex overflow-y-auto ">
          <div
            className="w-1/3 mt-20  ml-36 flex justify-center items-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div class="text-center">
              <i class="text-6xl text-blue-600 fas fa-shopping-bag"></i>
              <h2 class="text-3xl font-semibold mt-4">Image</h2>

              <p>The current time is: {time.toLocaleTimeString()}</p>
            </div>
          </div>
          <div class="w-2/3 p-6 mt-20 mr-36 bg-blue-100">
            <div class="text-right mt-6 pr-6">
              <a
                href="products.html"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition"
              >
                Go to Products
              </a>
            </div>
            <p>Current Item: {items[currentIndex]}</p>
            <div class=" mt-14 ml-10 pr-6">
              <h2 class="text-3xl font-semibold">Product Title</h2>
              <p class="text-gray-800 text-lg mb-4">
                Product description goes here. You can provide a detailed
                description of the product in this section.
              </p>
              <p class="text-xl text-blue-600 font-semibold">Price: $19.99</p>
              <div class="text-gray-700 mt-4">
                <p>
                  <span class="font-semibold">Quantity:</span> 10
                </p>
                <p>
                  <span class="font-semibold">Availability:</span> In Stock
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="flex overflow-y-auto ">
          <div
            className="w-1/3 mt-20  ml-36 flex justify-center items-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div class="text-center">
              <i class="text-6xl text-blue-600 fas fa-shopping-bag"></i>
              <h2 class="text-3xl font-semibold mt-4">Image</h2>

              <p>The current time is: {time.toLocaleTimeString()}</p>
            </div>
          </div>
          <div class="w-2/3 p-6 mt-20 mr-36 bg-blue-100">
            <div class="text-right mt-6 pr-6">
              <a
                href="products.html"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition"
              >
                Go to Products
              </a>
            </div>
            <p>Current Item: {items[currentIndex]}</p>
            <div class=" mt-14 ml-10 pr-6">
              <h2 class="text-3xl font-semibold">Product Title</h2>
              <p class="text-gray-800 text-lg mb-4">
                Product description goes here. You can provide a detailed
                description of the product in this section.
              </p>
              <p class="text-xl text-blue-600 font-semibold">Price: $19.99</p>
              <div class="text-gray-700 mt-4">
                <p>
                  <span class="font-semibold">Quantity:</span> 10
                </p>
                <p>
                  <span class="font-semibold">Availability:</span> In Stock
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-20" style={{boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1);"}}>
        <div class="flex overflow-y-auto ">
          <div
            className="w-1/3 mt-20  ml-36 flex justify-center items-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div class="text-center">
              <i class="text-6xl text-blue-600 fas fa-shopping-bag"></i>
              <h2 class="text-3xl font-semibold mt-4">Image</h2>

              <p>The current time is: {time.toLocaleTimeString()}</p>
            </div>
          </div>
          <div class="w-2/3 p-6 mt-20 mr-36 bg-blue-100">
            <div class="text-right mt-6 pr-6">
              <a
                href="products.html"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition"
              >
                Go to Products
              </a>
            </div>
            <p>Current Item: {items[currentIndex]}</p>
            <div class=" mt-14 ml-10 pr-6">
              <h2 class="text-3xl font-semibold">Product Title</h2>
              <p class="text-gray-800 text-lg mb-4">
                Product description goes here. You can provide a detailed
                description of the product in this section.
              </p>
              <p class="text-xl text-blue-600 font-semibold">Price: $19.99</p>
              <div class="text-gray-700 mt-4">
                <p>
                  <span class="font-semibold">Quantity:</span> 10
                </p>
                <p>
                  <span class="font-semibold">Availability:</span> In Stock
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Categories;